import TwitterLayout from "@/components/Layout/TwitterLayout";
import { useCurrentUser } from "@/hooks/user";
import type { GetServerSideProps, NextPage } from "next";
import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";
import FeedCard from "@/components/FeedCard";
import { Tweet, User } from "@/gql/graphql";
import { useRouter } from "next/router";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { followUserMutation, unfollowUserMutation } from "@/graphql/mutations/user";
import Link from "next/link";

interface ServerProps{
    userInfo?: User
}
const UserProfilePage: NextPage<ServerProps> = (props) => {
    const router = useRouter()
    const {user: currentUser} = useCurrentUser()
    const queryClient = useQueryClient()
    
    const handleFollowUser = useCallback( async() => {
        if (!props.userInfo?.id) return 
        await graphqlClient.request(followUserMutation, {to: props.userInfo?.id})
        await queryClient.invalidateQueries({queryKey: ["current-user"]})
    }, [props.userInfo?.id, queryClient])

    const handleUnFollowUser = useCallback( async() => {
        if (!props.userInfo?.id) return 
        await graphqlClient.request(unfollowUserMutation, {to: props.userInfo?.id})
        await queryClient.invalidateQueries({queryKey: ["current-user"]})

    }, [props.userInfo?.id, queryClient])

    const amIFollowing = useMemo( ()=>{
        if(!props?.userInfo) return false
        else 
        return ((currentUser?.following?.findIndex(ele => ele.id === props.userInfo?.id)?? -1) >= 0) 
    }, [currentUser?.following, props.userInfo])
    return(
        <div>
            <TwitterLayout>
                <div className=" border-b border-slate-800">
                    <nav className="flex items-center gap-3 py-3 px-3">
                        <Link href='/'>
                        <BiArrowBack  className="text-xl"/>
                        </Link>
                        <div className="">
                            <h1 className="text-xl font-bold">{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>

                            <h1 className="text-sm text-slate-500"> 100 posts</h1>
                        </div>
                    </nav>
                    <div className="p-4">
                        {
                            props.userInfo?.profileImageURL && (
                                <Image src = {props.userInfo?.profileImageURL} alt='profile-image' width={100} height={100} className="rounded-full"
                                 />
                            )
                        }
                    <h1 className="text-xl font-bold mt-5 ">{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 mt-4 text-gray-400"> 
                            <span>
                                {props.userInfo?.followers?.length} followers
                            </span>
                            <span>
                                {props.userInfo?.following?.length} following
                            </span>
                        </div>
                        {
                            currentUser?.id !== props.userInfo?.id && (
                                <>
                                {
                                    amIFollowing ?                                 
                                    <button onClick={handleUnFollowUser}  className="bg-white text-sm text-black rounded-full font-semibold px-3 py-2">Unfollow</button>
                                    :
                                    <button onClick={handleFollowUser} className="bg-white text-sm text-black rounded-full font-semibold px-3 py-2">Follow</button>
                                }
                                </>

                            )

                        }
                    </div>
                    </div>
                    <div>
                        {props.userInfo?.tweets?.map(tweet => <FeedCard data={tweet as Tweet} key={tweet.id }/>)}
                    </div>
                </div>
            </TwitterLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async(
    context
) => {
    const id = context.query.id as string | undefined;
    if (!id) return { notFound: true, props: {userInfo: undefined}}
    const userInfo = await graphqlClient.request(getUserByIdQuery, {id})
    if(!userInfo) return { notFound: true}

    return {
        props:{
            userInfo: userInfo.getUserById as User,
        }
    }
}


export default UserProfilePage;
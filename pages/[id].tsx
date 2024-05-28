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

interface ServerProps{
    userInfo?: User
}
const UserProfilePage: NextPage<ServerProps> = (props) => {
    const router = useRouter()
    return(
        <div>
            <TwitterLayout>
                <div className=" border-b border-slate-800">
                    <nav className="flex items-center gap-3 py-3 px-3">
                        <BiArrowBack  className="text-xl"/>
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
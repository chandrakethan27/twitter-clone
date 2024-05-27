import TwitterLayout from "@/components/Layout/TwitterLayout";
import { useCurrentUser } from "@/hooks/user";
import type { NextPage } from "next";
import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";
import FeedCard from "@/components/FeedCard";
import { Tweet } from "@/gql/graphql";
const UserProfilePage: NextPage = () => {
    const {user} = useCurrentUser();
    return(
        <div>
            <TwitterLayout>
                <div className=" border-b border-slate-800">
                    <nav className="flex items-center gap-3 py-3 px-3">
                        <BiArrowBack  className="text-xl"/>
                        <div className="">
                            <h1 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h1>
                            <h1 className="text-sm text-slate-500"> 100 posts</h1>
                        </div>
                    </nav>
                    <div className="p-4">
                        {
                            user?.profileImageURL && (
                                <Image src = {user?.profileImageURL} alt='profile-image' width={100} height={100} className="rounded-full"
                                 />
                            )
                        }
                    <h1 className="text-xl font-bold mt-5 ">{user?.firstName} {user?.lastName}</h1>

                    </div>
                    <div>
                        {user?.tweets?.map(tweet => <FeedCard data={tweet as Tweet} key={tweet.id }/>)}
                    </div>
                </div>
            </TwitterLayout>
        </div>
    )
}

export default UserProfilePage;
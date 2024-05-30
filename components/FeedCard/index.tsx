import React from "react";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { LuHeart } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";
interface FeedCardProps{
    data: Tweet
}

const FeedCard: React.FC<FeedCardProps>= (props) =>{
    const {data} = props
    return (
    <div>
        <div className="border border-gray-700 border-r-0 border-l-0 border-b-0 p-5 hover:bg-slate-900 transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                    { data.author.profileImageURL && 
                    <Image className="rounded-full"
                     src={data.author.profileImageURL}
                      alt="user-image" 
                      height={50} width={50}/>}
                </div>
                <div className="col-span-11">
                    <h5>
                        <Link href={`${data.author.id}`}>
                        {data.author?.firstName} {data.author?.lastName}
                        </Link>
                    </h5>
                    <p>
                        {data.content}
                        
                    </p>
                    {data.imageURL && <Image src={data.imageURL} alt="tweet-image" width={300} height={300}/>}

                    <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
                        <div>
                            <FaRegComment/>
                        </div>
                        <div>
                            <FaRetweet/>
                        </div>
                        <div>
                            <LuHeart/>
                        </div>
                        <div>
                            <FiUpload/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default FeedCard;
import React from "react";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { LuHeart } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
const FeedCard: React.FC = () =>{
    return <div>
        <div className="border border-gray-700 border-r-0 border-l-0 border-b-0 p-5 hover:bg-slate-900 transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                    <Image className="rounded-full" src="https://avatars.githubusercontent.com/u/90309231?v=4" alt="user-image" height={50} width={50}/>
                </div>
                <div className="col-span-11">
                    <h5>
                    Chandrakethan
                    </h5>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi possimus, dicta nostrum
                         aspernatur laboriosam sint neque ducimus explicabo magni eum fuga, quaerat facilis sequi rem soluta. 
                         Nemo impedit dicta veniam illum architecto ut sit sequi fugit, omni.
                    </p>
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
    </div>
}
export default FeedCard;
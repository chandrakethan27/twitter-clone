import { BsTwitterX } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { PiBellLight } from "react-icons/pi";
import { BiEnvelope } from "react-icons/bi";
import { RiFileList2Fill } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import FeedCard from "@/components/FeedCard";
// import { GoogleLogin } from '@react-oauth/google';

interface TwitterSidebarButton{
  title: string;
  icon: React.ReactNode;
}
const sideMenuBarItems : TwitterSidebarButton [] = [
  {
    title: "Home",
    icon: <GoHome />
  },
  {
    title: "Explore",
    icon: <IoIosSearch />
  },
  {
    title: "Notifications",
    icon: <PiBellLight />
  },
  {
    title: "Messages",
    icon: <BiEnvelope />
  },
  {
    title: "Lists",
    icon: <RiFileList2Fill />
  },
  {
    title: "Bookmarks",
    icon: <FaRegBookmark />
  },
  {
    title: "Communities",
    icon: <BsPeople />
  },
  {
    title: "Premium",
    icon: <BsTwitterX />
  },
  {
    title: "Profile",
    icon: <BsPerson />
  },
  {
    title: "More",
    icon: <CiCircleMore />
  }
]

export default function Home() {
  return (
    <div>
        <div className='grid grid-cols-12 h-screen w-screeen px-56'>
            <div className="col-span-3 pt-2 "> 
            <div className="text-3xl h-fit w-fit hover:bg-slate-900 rounded-full p-4 cursor-pointer transition-all">
            <BsTwitterX/>
            </div>
            <div className="mt-4 text-xl">
            <ul>
              {sideMenuBarItems.map(item => <li className="flex mb-3 cursor-pointer justify-start px-3 py-3 items-center gap-4 hover:bg-gray-800 rounded-full p-2 w-fit" key={item.title}><span className="text-3xl">{item.icon}</span><span>{item.title}</span></li>)}
            </ul>
            <button className="bg-[#1d9bf0] text-lg font-bold px-24 py-3 rounded-full mt-4 hover:bg-sky-600">
              Post
            </button>
            </div>
            </div>
            <div className="col-span-6 border-r-[1px] border-l-[1px] border-gray-700 h-screen  transition-all">
              <FeedCard />
              <FeedCard />
              <FeedCard />
              <FeedCard />
              <FeedCard />
              <FeedCard />
              <FeedCard />
              <FeedCard />
              <FeedCard />
              <FeedCard />
              <FeedCard />
              <FeedCard />
              <FeedCard />
              <FeedCard />
              <FeedCard />
            </div>
            <div className="col-span-3 ">
              <div >
              {/* <GoogleLogin onSuccess={(cred) => console.log(cred)} /> */}
              </div>
              
            </div>
        </div>
    </div>
  )
}

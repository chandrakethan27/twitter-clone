import { BsTwitterX } from "react-icons/bs"
import { IoIosSearch } from "react-icons/io"
import { GoHome } from "react-icons/go"
import { PiBellLight } from "react-icons/pi"
import { BiEnvelope } from "react-icons/bi"
import { RiFileList2Fill } from "react-icons/ri"
import { FaRegBookmark } from "react-icons/fa"
import { BsPeople } from "react-icons/bs"
import { CiCircleMore } from "react-icons/ci"
import { BsPerson } from "react-icons/bs"
import FeedCard from "@/components/FeedCard"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { useCallback, useState } from "react"
import  toast  from 'react-hot-toast'
import { graphqlClient } from "../clients/api"
import {verifyUserGoogleTokenQuery} from '../graphql/query/user'
import { useCurrentUser } from "@/hooks/user"
import { useQueryClient } from "@tanstack/react-query"
import { RxImage } from "react-icons/rx";

import Image from "next/image"
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet"
interface TwitterSidebarButton{
  title: string
  icon: React.ReactNode
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
  const handleSelectImage = useCallback(()=>{
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute('accept', 'image/*')
    input.click()
  
  },[])
  const {user} = useCurrentUser()
  const {tweets} = useGetAllTweets()
  const { mutate} = useCreateTweet()
  const queryClient = useQueryClient()
  const [content, setContent] = useState('')
  const handleCreateTweet = useCallback(()=> {
      mutate({
        content,
      })

  },[content, mutate])


  const handleLoginWithGoogle = useCallback(
    async(cred: CredentialResponse)=>{
    const googleToken = cred.credential
    if(!googleToken)
      {
        return toast.error('token not found!')
      }
    const {verifyGoogleToken} = await graphqlClient.request(verifyUserGoogleTokenQuery, 
      {token: googleToken})
    toast.success("Verified Sucess")
    if(verifyGoogleToken){
      window.localStorage.setItem('twitter_token', verifyGoogleToken)
    }
    await queryClient.invalidateQueries(["current-user"])

  }, [queryClient])

  return (
    <div>
        <div className='grid grid-cols-12 h-screen w-screeen px-56'>
            <div className="col-span-3 pt-2 relative"> 
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
            <div className="absolute bottom-3 flex gap-2 items-center hover:bg-gray-800 rounded-full p-3 w-60">
              {user &&
               user.profileImageURL && 
              <Image 
              className="rounded-full "
              src={user?.profileImageURL} 
              alt="user-image"
              height={45}
              width={45} 
              /> 
              }
              <div>
              <h3 className="text-l font-semibold absolute top-3">{user && user.firstName} {user && user.lastName}</h3>
              </div>
            </div>
            </div>

            <div className="col-span-6 border-r-[1px] border-l-[1px] border-gray-700 h-screen  transition-all">
              <div className="border border-gray-700 border-r-0 border-l-0 border-b-0 p-5 transition-all cursor-pointer">
                <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                {user?.profileImageURL && <Image 
                    className="rounded-full" 
                    src={user.profileImageURL} 
                    alt="user-image" 
                    height={50} 
                    width={50}
                />}
                </div>
                <div className="col-span-11">
                  <textarea
                   className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
                   value = {content}
                   onChange={ e=> setContent(e.target.value)}
                  placeholder="What is happening?!" rows={3}></textarea>
                  <div className="mt-2 flex justify-between items-center">
                    <RxImage onClick={handleSelectImage} className="text-xl"/>
                    <button onClick={handleCreateTweet}
                     className="bg-[#1d9bf0] text-sm font-bold px-3 py-2 rounded-full mt-4 hover:bg-sky-600">
                    Post
            </button>
                  </div>
                </div>
                </div>
              </div>
              {
                tweets?.map(tweet => <FeedCard key={tweet?.id} data={tweet} />)
              }
                </div>
            <div className="col-span-3 p-4">
            {!user &&
              (<div className="p-5 rounded-lg border-slate-600 border">
              <h1 className="font-bold text-xl mb-2">New To Twitter? </h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
              </div>)
              }
            </div>
        </div>
    </div>
  )
}
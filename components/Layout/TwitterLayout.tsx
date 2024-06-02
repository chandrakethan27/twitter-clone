import  React, { useMemo } from 'react';
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
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { useCallback, useState } from "react"
import  toast  from 'react-hot-toast'
import { graphqlClient } from "../../clients/api"
import {verifyUserGoogleTokenQuery} from '../../graphql/query/user'
import { useCurrentUser } from "@/hooks/user"
import { useQueryClient } from "@tanstack/react-query"
import Link from 'next/link';
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from 'next/router';

import Image from "next/image"
interface TwitterSidebarButton{
  title: string
  icon: React.ReactNode
  link: string
}

interface TwitterlayoutProps {
    children: React.ReactNode;
}

const TwitterLayout: React.FC<TwitterlayoutProps> = (props)=>{
const {user} = useCurrentUser()
const router = useRouter();


const handleLogout = ()=>{
  localStorage.removeItem('twitter_token')
  router.reload()
}

const sideMenuBarItems:TwitterSidebarButton[] = useMemo( ()=>[
        {
          title: "Home",
          icon: <GoHome />,
          link: '/',
        },
        {
          title: "Explore",
          icon: <IoIosSearch />,
          link: '/'
        },
        {
          title: "Notifications",
          icon: <PiBellLight />,
          link: '/'
        },
        {
          title: "Messages",
          icon: <BiEnvelope />,
          link: '/'
        },
        {
          title: "Lists",
          icon: <RiFileList2Fill />,
          link: '/'
        },
        {
          title: "Bookmarks",
          icon: <FaRegBookmark />,
          link: '/'
        },
        {
          title: "Communities",
          icon: <BsPeople />,
          link: '/'
        },
        {
          title: "Premium",
          icon: <BsTwitterX />,
          link: '/'
        },
        {
          title: "Profile",
          icon: <BsPerson />,
          link: `/${user?.id}`
        },
        {
          title: "More",
          icon: <CiCircleMore />,
          link: '/'
        },
      ]
      ,[user?.id]
    )

      const queryClient = useQueryClient()
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
    return(
        <div>
        <div className='grid grid-cols-12 h-screen w-screeen sm:px-56'>
            <div className="col-span-2 sm:col-span-3 pt-2 flex sm:justify-end relative pr-4"> 
            <div>
            <div className="text-3xl h-fit w-fit hover:bg-slate-900 rounded-full p-4 cursor-pointer transition-all">
            <BsTwitterX/>
            </div>
            <div className="mt-4 text-xl">
            <ul>
              {sideMenuBarItems.map((item => 
              <li  
              key={item.title}>
              <Link href={item.link} className="flex mb-3 cursor-pointer justify-start px-3 py-3 items-center gap-4 hover:bg-gray-800 rounded-full p-2 w-fit">
              <span className="text-3xl">{item.icon}</span>
              <span className='hidden sm:inline'>{item.title}</span>
              </Link>
              </li>
              ))}
            </ul>
            <button className="hidden sm:block bg-[#1d9bf0] text-lg font-bold px-24 py-3 rounded-full mt-4 hover:bg-sky-600">
              Post
            </button>
            </div>
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
              <h3 className="text-l font-semibold absolute top-3 hidden sm:block">{user && user.firstName} {user && user.lastName}</h3>
              </div>
            </div>

            </div>

            <div className="col-span-10 sm:col-span-5 border-r-[1px] border-l-[1px] border-gray-700 h-screen  transition-all">
                {props.children}
            </div>

            <div className="col-span-0 sm:col-span-3 p-4">
            {!user ?
              (<div className="p-5 rounded-lg border-slate-600 border">
              <h1 className="font-bold text-xl mb-2">New To Twitter? </h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
              </div>):(
                <div>
                  <div className='mb-7'>
                    <button className=' bg-white text-black hover:bg-red-600 rounded-md px-3 py-1 w-30 text-lg font-bold' onClick={handleLogout}>
                      Logout 
                    </button>
                  </div>
                <div className="p-3 rounded-lg border-slate-600 border">
                <h1 className=" my-2 font-bold text-xl mb-5" > Who to follow</h1>
              { user?.recommendedUsers?.map((ele:any) => (
                <div key={ele?.id} className='flex items-center gap-3' > 

                  {ele?.profileImageURL &&
                   (<Image 
                  src={ele?.profileImageURL} 
                  alt='user-image' 
                  className='rounded-full'
                  width={60} height={60}  
                  />
                  )}
                  <div>
                  <div>
                  {ele.firstName}
                  {ele?.lastName}
                  </div>
                  <Link href={`${ele?.id}`} className='bg-white text-sm text-black rounded-sm font-semibold px-3'>
                    View
                  </Link>
                  </div>
 
                </div>
               )
               )
              }
              </div>
              </div>
              )}
            </div>
        </div>
        </div>
    )
}

export default TwitterLayout
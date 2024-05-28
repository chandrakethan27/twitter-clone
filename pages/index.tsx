
import FeedCard from "@/components/FeedCard"
import { useCallback, useState } from "react"
import { useCurrentUser } from "@/hooks/user"
import { useQueryClient } from "@tanstack/react-query"
import { RxImage } from "react-icons/rx";
import Image from "next/image"
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet"
import TwitterLayout from "@/components/Layout/TwitterLayout"
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/api";
import { getAllTweetQuery } from "@/graphql/query/tweet";
import { Tweet } from "@/gql/graphql";

interface HomeProps {
  tweets?: Tweet[]
}

export default function Home(props) {

  const handleSelectImage = useCallback(()=>{
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute('accept', 'image/*')
    input.click()
  },[])
  const {user} = useCurrentUser()
  const { mutate} = useCreateTweet()
  const [content, setContent] = useState('')
  const handleCreateTweet = useCallback(()=> {
      mutate({
        content,
      })

  },[content, mutate])
  return (
    <div>
      <TwitterLayout>
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
                props.tweets?.map(tweet => <FeedCard key={tweet?.id} data={tweet} />)
              }

      </TwitterLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async(context) => {
  const allTweets = await graphqlClient.request(getAllTweetQuery);
  return {
    props: {
      tweets: allTweets.getAllTweets as Tweet[],
    }
  }
}
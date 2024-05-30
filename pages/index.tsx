
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
import { getAllTweetQuery, getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import { Tweet } from "@/gql/graphql";
import toast from "react-hot-toast";
import axios from "axios";

interface HomeProps {
  tweets?: Tweet[]
}

export default function Home(props: HomeProps){
  const {tweets = props.tweet as Tweet[]} = useGetAllTweets()

  const [imageURL, setImageURL] = useState("")
  const handleInputChangeFile = useCallback(  (input: HTMLInputElement) => {
    return async (event: Event) =>{
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if(!file) return
      const {getSignedURLForTweet} = await graphqlClient.request(getSignedURLForTweetQuery, {
        imageName: file.name,
        imageType: file.type,
      })

      if(getSignedURLForTweet){
        toast.loading('Uploading...', {id: '1'})
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            'Content-Type': file.type
          }
        })
        toast.success('Upload Complete', {id: '2'})
        const url = new URL(getSignedURLForTweet)
        const myFilePath = `${url.origin}${url.pathname}`
        setImageURL(myFilePath)
      }
    }

  },[])
  const handleSelectImage = useCallback(()=>{
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute('accept', 'image/*')
    const handlerFn = handleInputChangeFile(input)
    input.addEventListener("change", handlerFn)
    input.click()

  },[handleInputChangeFile])
  const {user} = useCurrentUser()
  const { mutateAsync} = useCreateTweet()

  const [content, setContent] = useState('')
  const handleCreateTweet = useCallback(async ()=> {
      await mutateAsync({
        content,
        imageURL
      })
      setImageURL('')
      setContent('')

  },[content, mutateAsync, imageURL])
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
                  {
                    imageURL && <Image src = { imageURL} alt="tweet-image" width={300} height={300}/>
                  }
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
                tweets?.map((tweet) => <FeedCard key={tweet?.id} data={tweet} /> )
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
import { graphqlClient } from "@/clients/api"
import { CreateTweetData } from "@/gql/graphql"
import { createTweetMutation } from "@/graphql/mutations/tweet"
import { getAllTweetQuery } from "@/graphql/query/tweet"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCreateTweet = () => {
    const queryCient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (payload: CreateTweetData) => graphqlClient.request(createTweetMutation, {payload}),
        onMutate: (payload) => toast.loading('Creating tweet', {id: '1'}),
        onSuccess: async (payload)=> {
            await queryCient.invalidateQueries({queryKey: ["current-user"]})
            toast.success('Created Success', {id:'1'})
        }
    })
    return mutation
}

export const useGetAllTweets = () => {
    const query = useQuery({
        queryKey: ['all-tweets'],
        queryFn: () => graphqlClient.request(getAllTweetQuery),
    });
    return {...query, tweets: query.data?.getAllTweets}
}
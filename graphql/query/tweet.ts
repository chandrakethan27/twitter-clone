import { graphql } from "@/gql";

export const getAllTweetQuery = graphql(`
    #graphql

    query GetAllTweets {
        getAllTweets {
          id
          content
          author {
            firstName
            lastName
            profileImageURL
          }
        }
      }
`)
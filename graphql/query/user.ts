import { graphql } from "../../gql";


export const verifyUserGoogleTokenQuery =  graphql(`#graphql
query VerifyGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
}
`) 

export const getCurrentUserQuery = graphql(`
query GetCurrentUser {
    getCurrentUser {
      id
      profileImageURL
      email
      firstName
      lastName
      tweets{
        id
        content
        author{
          firstName
          lastName
          profileImageURL
        }
      }
    }
  }
`)
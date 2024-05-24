import { graphql } from "../../gql";


export const verifyUserGoogleTokenQuery =  graphql(`#graphql
query VerifyGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
}
`) 
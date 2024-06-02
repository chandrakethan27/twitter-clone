 import { GraphQLClient } from "graphql-request";

 const isClient = typeof window !== "undefined" 

 export const graphqlClient = new GraphQLClient("https://d3jo5ut9o8q5v7.cloudfront.net/graphql",
 {
    headers: ()=>({
        Authorization: isClient
        ? `Bearer ${window.localStorage.getItem("twitter_token")}`
        : ''
    })
 }
 ); 
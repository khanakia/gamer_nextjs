import { gql } from "graphql-request";

export const queryWebsites = gql`
  query websites {
    websites {
     id
     userId
     name
     title
     status
     logoUrl
     subDomain
     channel
     host
     siteUrl
    }
  }
`;
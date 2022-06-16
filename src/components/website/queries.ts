import { gql } from "graphql-request";

export const mutation_websiteUpdate = gql`
  mutation websiteUpdate($id: String!, $input: WebsiteUpdateInput!) {
    websiteUpdate(id: $id, input: $input)
  }
`;

export const mutation_websiteCreate = gql`
  mutation websiteCreate($input: WebsiteCreateInput!) {
    websiteCreate(input: $input) {
      id
      channel
    }
  }
`;

export const mutation_websiteConnectWordpress = gql`
  mutation websiteConnectWordpress($id: String!, $input: WebsiteConnectWordpressInput!) {
    websiteConnectWordpress(id: $id, input: $input)
  }
`;

export const mutation_websiteConnectContentful = gql`
  mutation websiteConnectContentful($id: String!, $input: WebsiteConnectContentfulInput!) {
    websiteConnectContentful(id: $id, input: $input)
  }
`;


export const mutation_websiteCacheClearAll = gql`
  mutation websiteCacheClearAll($id: String!) {
    websiteCacheClearAll(id: $id)
  }
`;

export const mutation_websiteSoftDelete = gql`
  mutation websiteSoftDelete($id: String!) {
    websiteSoftDelete(id: $id)
  }
`;

export const mutation_resycnContentful = gql`
  mutation websiteContentfulResync($id: String!) {
    websiteContentfulResync(id: $id){
      ErrorMessage
      Data
    }
  }
`;
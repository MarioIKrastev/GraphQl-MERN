import { gql } from "@apollo/client";

const GET_CLIENT = gql`
  query getClient($id: ID!) {
    client(id: $id) {
      id
      projects {
        name
        description
        status
      }
    }
  }
`;
export { GET_CLIENT };

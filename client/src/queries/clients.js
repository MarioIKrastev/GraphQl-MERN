import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
    query getClients {
        clients {
            id
            name
            email
            phone
            projects {
                id
                name
                description
                status
            }
        }
    }
`;

export { GET_CLIENTS };

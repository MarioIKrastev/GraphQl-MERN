import { gql } from "@apollo/client";

//$status: ProjectStatus! is comming from the BE mutation schema - addProject-name  -- because it's enum value in the DB
const ADD_PROJECT = gql`
    mutation addProject(
        $name: String!
        $description: String!
        $status: ProjectStatus!
        $clientId: ID!
    ) {
        addProject(
            name: $name
            description: $description
            status: $status
            clientId: $clientId
        ) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;
const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
        }
    }
`;

export { DELETE_PROJECT, ADD_PROJECT };

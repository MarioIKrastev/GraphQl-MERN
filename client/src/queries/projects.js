import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      status
    }
  }
`;
const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
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
const GET_USERPROJECTS = gql`
  query getUserProjects($id: ID!) {
    userProjects(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
      }
    }
  }
`;
export { GET_PROJECTS, GET_PROJECT, GET_USERPROJECTS };

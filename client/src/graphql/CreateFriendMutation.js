import gql from "graphql-tag";

export const createFriendMutation = gql`
  mutation createFriend($firstName: String!, $lastName: String!) {
    createFriend(input: {firstName: $firstName, lastName: $lastName }) {
      id
      firstName
      lastName
    }
  }
`;

import gql from "graphql-tag";

export const getFriendsQuery = gql`
  query GetFriends {
    getFriends {
      id
      firstName
      lastName
    }
  }
`;

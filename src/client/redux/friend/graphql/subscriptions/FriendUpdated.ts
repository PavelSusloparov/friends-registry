import { gql } from "apollo-boost";

export const friendUpdated = gql`
    subscription FriendUpdated($id: ID!) {
        friendUpdated(id: $id) {
            id
            firstName
            lastName
        }
    }
`;

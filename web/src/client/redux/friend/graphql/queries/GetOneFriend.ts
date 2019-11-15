import {gql} from "apollo-boost";

export const getFriendById = gql`
    query GetOneFriend($id: ID!) {
        getOneFriend(id: $id) {
            id
            firstName
            lastName
        }
    }
`;

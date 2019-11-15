import {gql} from "apollo-boost";

export const getFriends = gql`
    query GetFriends {
        getFriends {
            id
            firstName
            lastName
        }
    }
`;

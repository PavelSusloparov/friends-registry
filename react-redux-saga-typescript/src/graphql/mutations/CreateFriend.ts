import {gql} from "apollo-boost";

export const createFriend = gql`
    mutation createFriend($firstName: String!, $lastName: String!) {
        createFriend(input: {firstName: $firstName, lastName: $lastName }) {
            id
            firstName
            lastName
        }
    }
`;

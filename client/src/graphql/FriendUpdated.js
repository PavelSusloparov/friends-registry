import gql from 'graphql-tag';

export const friendUpdated = gql`
    subscription FriendUpdated($id: ID!) {
        friendUpdated(id: $id) {
            id
            firstName
            lastName
        }
    }
`;

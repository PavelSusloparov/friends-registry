import {
    createFriendVariables,
    GetFriends,
    GetOneFriend,
    GetOneFriendVariables
} from "../../../generated/graphql/generatedTypes";
import {GraphqlClient} from "../../../utils/graphql/client";
import {createFriend} from "./mutations/CreateFriend";
import {getFriends} from "./queries/GetFriends";
import {getFriendById} from "./queries/GetOneFriend";
import {friendUpdated} from "./subscriptions/FriendUpdated";

export const createFriendCall = (input: createFriendVariables, client: GraphqlClient) => {
    return client
        .mutate({
            variables: {
                ...input
            },
            mutation: createFriend
        })
        .then((response) => {
            return {
                ...response,
                value: response.data.createFriend
            };
        });
};

export const getFriendsCall = (client: GraphqlClient) => {
    console.log(`Invoke getFriendsCall`);
    return client
        .query<GetFriends>({
            query: getFriends,
            fetchPolicy: "network-only"
        })
        .then((response) => {
            return {
                ...response,
                value: response.data.getFriends
            };
        });
};

export const getOneFriend = (input: GetOneFriendVariables, client: GraphqlClient) => {
    return client
        .query<GetOneFriend>({
            variables: {
                id: input.id
            },
            query: getFriendById,
            fetchPolicy: "network-only"
        })
        .then((response) => {
            console.log(response);
            return {
                ...response,
                value: response.data.getOneFriend
            };
        });
};

export const subscribeToFriendUpdate = (input: any, client: GraphqlClient) => {
    console.log(`subscribeToFriendUpdate kicked off`);
    return client.subscribe({
        variables: {
            ...input
        },
        query: friendUpdated,
        fetchPolicy: "no-cache"
    });
};

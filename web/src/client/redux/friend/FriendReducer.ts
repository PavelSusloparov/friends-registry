import {FlowStep, mergeState} from "../../utils/redux/ReduxHelpers";
import {createReducer} from "redux-act";
// @ts-ignore
import uuid from "uuid";
import {createFriendVariables, GetFriends, GetFriends_getFriends} from "../../generated/graphql/generatedTypes";
import {createFriendFlow, getFriendsFlow, updateFriend} from "./FriendActions";
import {FriendShape} from "./FriendShape";

export const getFriendsInitialState: Partial<FriendShape> = {};
export const friendsReducer = createReducer<Partial<FriendShape>>({}, getFriendsInitialState);

friendsReducer.on(createFriendFlow.try.toString(), (state: Partial<FriendShape>, payload: createFriendVariables) => {
    console.log(`Invoke createFriendFlow.try`);
    const friend: GetFriends_getFriends = {
        __typename: "Friend",
        ...payload,
        id: uuid.v1()
    };
    console.log(`my fake friend is ${JSON.stringify(friend)}`);
    console.log(`Current friends: ${state.friends}`);
    return mergeState(state, {
        friends: [...state.friends, friend],
        addFriendFlowStep: FlowStep.Started
    });
});

friendsReducer.on(createFriendFlow.success.toString(), (state: Partial<FriendShape>, payload: GetFriends_getFriends) => {
    console.log(`Invoke createFriendFlow.success`);
    // Which one was the fake user?
    // Pull that out of the array and replace w/ the new user (payload)
    let itemIndex = state.friends.findIndex(item => (item.firstName === payload.firstName && item.lastName === payload.lastName));
    state.friends.splice(itemIndex, 1, payload);

    return mergeState(state, {
        friends: state.friends,
        addFriendFlowStep: FlowStep.Success
    });
});

friendsReducer.on(getFriendsFlow.success.toString(), (state: Partial<FriendShape>, payload: GetFriends) => {
    console.log(`Invoke getFriendsFlow.success`);
    console.log(payload);
    return mergeState(state, {
        friends: payload.getFriends,
        getFriendsFlowStep: FlowStep.Success
    });
});

friendsReducer.on(getFriendsFlow.failed.toString(), (state: Partial<FriendShape>, payload: GetFriends) => {
    console.log(`Invoke getFriendsFlow.failed`);
    console.log(payload);
    return mergeState(state, {
        friends: null,
        getFriendsFlowStep: FlowStep.Failed,
        errorMessage: "Failed to load friends"
    });
});

friendsReducer.on(updateFriend.try.toString(), (state: Partial<FriendShape>, payload: GetFriends_getFriends) => {
    console.log(`Invoke updateFriend.try`);
    // Replace friend by looking for the item in the array with similar id
    const id = payload.id;
    let itemIndex = state.friends.findIndex(item => item.id === id);
    state.friends.splice(itemIndex, 1, payload);

    // Update the state with new friend array
    return mergeState(state, {
        friends: state.friends
    });
});

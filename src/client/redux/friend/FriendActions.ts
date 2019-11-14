import { createActionFlow } from "@redtech/keystone-client";

export const getFriendsFlow = createActionFlow("Loads friends data");
export const createFriendFlow = createActionFlow("Create friend data");
export const subscribeOnFriendUpdateFlow = createActionFlow("Subscribe on friend data");
export const updateFriend = createActionFlow<any>("Updates friend in store");

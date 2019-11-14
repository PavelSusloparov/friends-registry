import { ReducersMapObject } from "redux";
import { friendsReducer } from "./friend/FriendReducer";
import { subscriptionReducer } from "./subscriptions/subscriptionReducer";

export const rootReducer: ReducersMapObject = {
    friends: friendsReducer,
    subscriptions: subscriptionReducer
};

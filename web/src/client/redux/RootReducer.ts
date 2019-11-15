import {ReducersMapObject} from "redux";
import {friendsReducer} from "./friend/FriendReducer";

export const rootReducer: ReducersMapObject = {
    friends: friendsReducer
};

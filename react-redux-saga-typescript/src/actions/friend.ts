import {createAction} from "redux-actions";
import * as Actions from '../constants/actions';

export const getFriends = createAction(Actions.GET_FRIENDS);
export const addFriend = createAction<FriendData>(Actions.ADD_FRIEND);
export const subscribeOnFriendUpdate = createAction(Actions.SUBSCRIBE_ON_FRIEND_UPDATE);
export const updateFriend = createAction<FriendData>(Actions.UPDATE_FRIEND);

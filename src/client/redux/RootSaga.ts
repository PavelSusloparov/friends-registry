import { all, fork } from "redux-saga/effects";
import { friendSaga } from "./friend/FriendSaga";

export const rootSaga = function* () {
    yield all([
        fork(friendSaga)
    ]);
};

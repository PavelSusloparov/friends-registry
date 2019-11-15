import {all, fork} from "redux-saga/effects";
import {helloSaga} from "./friend/FriendSaga";

export const rootSaga = function* () {
    yield all([
        fork(helloSaga)
    ]);
};

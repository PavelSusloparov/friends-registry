import {Action} from "redux-act";
import {put, takeLatest} from "redux-saga/effects";
import {makeGraphqlCall} from "../../utils/GraphqlEffect";
import {createFriendFlow, getFriendsFlow} from "./FriendActions";
import {createFriendCall, getFriendsCall} from "./graphql/FriendApi";

export function* handleCreateFriendDataFlow(action: Action<number>) {

    console.log(`Invoke action: ${JSON.stringify(action)}`);
    try {
        yield put(createFriendFlow.start(action.payload));

        console.log(`Start createFriendsFlow action.`);

        const friend: any = yield makeGraphqlCall(createFriendCall, action.payload);

        console.log(friend);
        console.log(`My new friend is: ${friend}`);

        yield put(createFriendFlow.success(friend.value));
    } catch (err) {
        console.log("createFriendsFlow failed", err);
        yield put(createFriendFlow.failed(err));
    } finally {
        yield put(createFriendFlow.done());
    }
}

export function* handleGetFriendsDataFlow(action: Action<number>) {

    console.log(`Invoke action: ${JSON.stringify(action)}`);
    try {
        yield put(getFriendsFlow.start());
        console.log(`Start getFriendsFlow action.`);
        const friends: any = yield makeGraphqlCall(getFriendsCall);
        console.log(friends);
        console.log(`My friends are: ${friends}`);
        yield put(getFriendsFlow.success(friends.value));
    } catch (err) {
        console.log("getFriendsFlow failed", err);
        yield put(getFriendsFlow.failed(err));
    } finally {
        yield put(getFriendsFlow.done());
    }
}

export function* friendSaga() {
    yield takeLatest(createFriendFlow.try, handleCreateFriendDataFlow);
    yield takeLatest(getFriendsFlow.try, handleGetFriendsDataFlow);
}

export function* helloSaga() {
    console.log('Hello Sagas!')
}

import { combineReducers, Reducer } from 'redux';
import todos from './todos';
import friends from "./friends";

export interface RootState {
  todos: TodoStoreState,
  friends: FriendStoreState,
}

export default combineReducers<RootState>({
  todos,
  friends
});

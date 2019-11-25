import { combineReducers, Reducer } from 'redux';
import todos from './todos';
import friends from "./friends";
import client from '../utils/graphql/apolloClient';

export interface RootState {
  todos: TodoStoreState,
  friends: FriendStoreState,
}

export default combineReducers<RootState>({
  todos,
  friends,
  apollo: client.reducer() as Reducer<undefined>,
});

import { handleActions } from 'redux-actions';
import * as Actions from '../constants/actions';

const initialState: FriendStoreState = [{
  id: 0,
  firstName: "DefaultJohn",
  lastName: "DefaultSmith",
}];

export default handleActions<FriendStoreState, FriendData>({
  [Actions.ADD_FRIEND]: (state, action) => {
    console.log(`Invoke ADD_FRIEND`);
    console.log(action.payload);

    return [{
      friends: action.payload,
      ...action.payload,
    }, ...state];
  },

  [Actions.GET_FRIENDS]: (state, action) => {
    console.log(`Invoke GET_FRIENDS`);
    console.log(action.payload);

    return [{
      friends: action.payload,
      ...action.payload,
    }, ...state];
  },
}, initialState);

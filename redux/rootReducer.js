import { combineReducers } from 'redux';

import RightHoldersReducer from "./RightHolders/Reducer";
import UsersReducer from "./Users/Reducer";

export default combineReducers({
  rightHolders: RightHoldersReducer,
  users: UsersReducer
});
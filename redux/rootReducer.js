import { combineReducers } from 'redux';

import RightHoldersReducer from "./RightHolders/Reducer";

export default combineReducers({
  rightHolders: RightHoldersReducer
});
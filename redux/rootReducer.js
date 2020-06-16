import { combineReducers } from "redux"

import UsersReducer from "./users/reducer"

export default combineReducers({
	users: UsersReducer,
})

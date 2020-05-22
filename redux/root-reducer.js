import { combineReducers } from "redux"

import UsersReducer from "./users/reducer"
import AuthReducer from "./auth/reducer"
import EntitiesReducer from "./entities/reducer"
export default combineReducers({
	users: UsersReducer,
	auth: AuthReducer,
	entities: EntitiesReducer,
})

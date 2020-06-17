import { combineReducers } from "redux"

import UsersReducer from "./users/reducer"
import EntitiesReducer from "./entities/reducer"

export default combineReducers({
	users: UsersReducer,
	entities: EntitiesReducer,
})

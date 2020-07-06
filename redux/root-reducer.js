import { combineReducers } from "redux"

import EntitiesReducer from "./entities/reducer"

export default combineReducers({
	entities: EntitiesReducer,
})

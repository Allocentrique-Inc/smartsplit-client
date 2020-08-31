import { entityReducer } from "../api"
const INITIAL_STATE = {
	entityList: {
		data: null,
		type: null,
		error: null,
		isLoading: null,
	},
}

export default function (state = INITIAL_STATE, action) {
	let newState = {}
	switch (action.type) {
		case "ENTITY_SETSTATE":
			entityReducer(state, newState, action)
			break

		case "ENTITY_LIST_REQUEST":
			newState.entityList = {
				...state.entityList,
				data: null,
				type: action.payload,
				isLoading: true,
				error: null,
			}
			//	console.log(newState)
			break

		case "ENTITY_LIST_SUCCESS":
			newState.entityList = {
				...state.entityList,
				data: action.payload,
				error: null,
				isLoading: false,
			}
			//	console.log(newState)
			break

		case "ENTITY_LIST_ERROR":
			newState.entityList = {
				...state.entityList,
				isLoading: false,
				error: action.payload,
			}
			//	console.log(newState)
			break

		case "ENTITY_LIST_RESET": {
			newState.entityList = INITIAL_STATE.entityList
			//	console.log(newState)
			break
		}

		case "CLEAR_ENTITY_LIST_ERROR": {
			newState.entityList = {
				...state.entityList,
				error: null,
			}
			//	console.log(newState)
			break
		}

		default:
			break
	}
	const returnvalue = { ...state, ...newState }
	console.log(JSON.stringify(returnvalue, null, 2))
	return returnvalue
}

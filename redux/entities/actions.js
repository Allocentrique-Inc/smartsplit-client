import { createCRUDActions } from "../api"
import * as entitiesAPI from "../../api/entities"

export function resetEntityList() {
	return {type: "ENTITY_LIST_RESET"}
}
export function listEntities(type) {
	return async function(dispatch) {
		dispatch({type: "ENTITY_LIST_REQUEST", payload: type})
		try {
			const response = await entitiesAPI.listEntities(type)
			dispatch({type: "ENTITY_LIST_SUCCESS", payload: response.data})
		} catch (error) {
			dispatch({type: "ENTITY_LIST_ERROR", payload: error.data ? error.data: error})
		}
	}
}

export default createCRUDActions(entitiesAPI.default, "ENTITY_SETSTATE")
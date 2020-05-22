import { createCRUDActions } from "../api"
import * as EntitiesAPI from "../../api/entities"
import { useDispatch, useSelector } from "react-redux"

export function resetEntityList() {
	return { type: "ENTITY_LIST_RESET" }
}

export function listEntities(type) {
	return async function (dispatch) {
		dispatch({ type: "ENTITY_LIST_REQUEST", payload: type })
		try {
			const response = await EntitiesAPI.listEntities(type)
			for (let i = 0; i < response.data.length; i++) {
				// noinspection JSUnfilteredForInLoop
				dispatch(setEntity(response.data[i].entity_id, response.data[i]))
			}
			dispatch({ type: "ENTITY_LIST_SUCCESS", payload: response.data })
		} catch (error) {
			dispatch({
				type: "ENTITY_LIST_ERROR",
				payload: error.data ? error.data : error,
			})
		}
	}
}

export function createEntity(data, type) {
	return async function (dispatch, getState) {
		dispatch({
			type: "ENTITY_SETSTATE",
			id: data.entity_id,
			data: data,
			error: null,
			state: "creating",
		})
		try {
			const result = await EntitiesAPI.createEntity(data, type)
			dispatch(setEntity(result.data.entity_id, result.data))
			return result
		} catch (error) {
			dispatch({
				type: "ENTITY_LIST_ERROR",
				payload: error,
			})
		}
	}
}

export function setEntity(entity_id, data) {
	return {
		type: "ENTITY_SETSTATE",
		id: entity_id,
		data: data,
		error: null,
		state: "ready",
	}
}

export default createCRUDActions(EntitiesAPI.default, "ENTITY_SETSTATE")

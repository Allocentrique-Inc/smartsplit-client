import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import UUID from "uuidjs"

export function createCRUDActions(ApiEntity, actionType) {
	async function doApiCall(
		dispatch,
		method,
		loadingState,
		finishedState,
		id,
		data,
		...params
	) {
		dispatch({
			type: actionType,
			id: id,
			data: data,
			error: null,
			state: loadingState,
		})

		try {
			const result = await ApiEntity[method](id, data, ...params)

			dispatch({
				type: actionType,
				id: id,
				state: finishedState,
				data: result.data,
			})

			return result
		} catch (error) {
			dispatch({
				type: actionType,
				id: id,
				error: error,
				state: "error",
			})

			throw error
		}
	}

	function genThunk(method, loadingState, finishedState) {
		return function (...args) {
			return function (dispatch) {
				return doApiCall(dispatch, method, loadingState, finishedState, ...args)
			}
		}
	}

	// prettier-ignore
	return {
		create:  genThunk("create",  "creating",   "ready"),
		read:    genThunk("read",    "loading",    "ready"),
		replace: genThunk("replace", "updating",   "ready"),
		update:  genThunk("update",  "updating",   "ready"),
		destroy: genThunk("destroy", "destroying", "destroyed"),
	}
}

export function entityReducer(prevState, newState, action) {
	newState[action.id] = {
		id: action.id,
		data: action.data,
		state: action.state,
		error: action.error,
	}
}

export function useApiRedux(actions, store, entityId, initData) {
	const dispatch = useDispatch()
	const id = useState(entityId || UUID.generate())[0]
	const data = useSelector((state) => state[store][id]) || {
		id: id,
		data: initData || {},
		state: initData ? "new" : "undefined",
		error: null,
	}

	const wrappedActions = {}

	function wrapAction(key) {
		return function (...args) {
			return actions[key](id, ...args)(dispatch)
		}
	}

	for (let key in actions) {
		wrappedActions[key] = wrapAction(key)
	}

	if (data.state === "undefined") {
		dispatch(actions.read(id))
	}

	return { ...data, ...wrappedActions }
}

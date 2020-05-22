import * as UsersAPI from "../../api/users"
import { login, setLogin } from "../auth/actions"
import { createCRUDActions } from "../api"

export function registerUser_request() {
	return {
		type: "REGISTER_USER_REQUEST",
	}
}

export function registerUser_success(data) {
	return {
		type: "REGISTER_USER_SUCCESS",
		payload: data,
	}
}

export function registerUser_reset() {
	return {
		type: "REGISTER_USER_RESET",
	}
}

export function registerUser_error(err) {
	return {
		type: "REGISTER_USER_ERROR",
		payload: err,
	}
}

export function registerUser(user) {
	return async function (dispatch) {
		dispatch(registerUser_request())

		try {
			const response = await UsersAPI.registerUser(user)
			dispatch(registerUser_success(response.data))
			dispatch(registerUser_reset())
		} catch (error) {
			if (error.data) dispatch(registerUser_error(error.data))
			else dispatch(registerUser_error(error))
		}
	}
}

export function forgotPassword_request() {
	return {
		type: "FORGOT_PASSWORD_REQUEST",
	}
}

export function forgotPassword_success(data) {
	return {
		type: "FORGOT_PASSWORD_SUCCESS",
		payload: data,
	}
}

export function forgotPassword_error(err) {
	return {
		type: "FORGOT_PASSWORD_ERROR",
		payload: err,
	}
}

export function forgotPassword(user) {
	return async function (dispatch) {
		dispatch(forgotPassword_request())

		try {
			const response = await UsersAPI.forgotPassword(user)
			dispatch(forgotPassword_success(response.data))
		} catch (error) {
			if (error.data) dispatch(forgotPassword_error(error.data))
			else dispatch(forgotPassword_error(error))
		}
	}
}

export function resetPassword(passwordDetails) {
	return async function (dispatch) {
		dispatch({ type: "RESET_PASSWORD_REQUEST" })

		try {
			const response = (await UsersAPI.passwordReset(passwordDetails)).data
			const user = response.user

			dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: response })
			dispatch(
				setLogin(
					response.accessToken,
					(user && user.user_id) || response.user_id
				)
			)

			if (user) {
				dispatch(setUser(user.user_id, user))
			}
		} catch (error) {
			dispatch({ type: "RESET_PASSWORD_ERROR", payload: error })
		}
	}
}

export function activateAccount(token) {
	return async function (dispatch) {
		dispatch({ type: "ACTIVATE_REQUEST" })

		try {
			const response = await UsersAPI.activateAccount(token)
			const user = response.user

			dispatch(
				setLogin(
					response.accessToken,
					(user && user.user_id) || response.user_id
				)
			)

			dispatch({
				type: "ACTIVATE_SUCCESS",
				payload: response,
			})
		} catch (error) {
			dispatch({
				type: "ACTIVATE_ERROR",
				payload: error.data || error,
			})
		}
	}
}

export function updateUser_request() {
	return {
		type: "UPDATE_USER_REQUEST",
	}
}

export function updateUser_success(data) {
	return {
		type: "UPDATE_USER_SUCCESS",
		payload: data,
	}
}

export function updateUser_error(err) {
	return {
		type: "UPDATE_USER_ERROR",
		payload: err,
	}
}

export function updateUser(details) {
	return async function (dispatch) {
		dispatch(updateUser_request())

		try {
			const response = await UsersAPI.updateUser(details)
			dispatch(updateUser_success(response.data))
		} catch (error) {
			if (error.data) dispatch(updateUser_error(error.data))
			else dispatch(updateUser_error(error))
		}
	}
}

export function setUser(user_id, data) {
	return {
		type: "USER_SETSTATE",
		id: user_id,
		data: data,
		error: null,
		state: "ready",
	}
}

export default createCRUDActions(UsersAPI.default, "USER_SETSTATE")

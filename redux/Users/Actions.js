import * as UsersAPI from "../../api/Users"
import { saveAuth } from "../../helpers/storageAuth"

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

export function resetPassword_request() {
	return {
		type: "RESET_PASSWORD_REQUEST",
	}
}

export function resetPassword_success(data) {
	return {
		type: "RESET_PASSWORD_SUCCESS",
		payload: data,
	}
}

export function resetPassword_error(err) {
	return {
		type: "RESET_PASSWORD_ERROR",
		payload: err,
	}
}

export function resetPassword(passwordDetails) {
	return async function (dispatch) {
		dispatch(resetPassword_request())

		try {
			const response = await UsersAPI.passwordReset(passwordDetails)
			if (response.data && response.data.accessToken) {
				saveAuth(response.data)
				dispatch({
					type: "LOGIN_USER_SUCCESS",
					payload: response.data,
				})
			}
			dispatch(resetPassword_success(response.data))
		} catch (error) {
			if (error.data) dispatch(resetPassword_error(error.data))
			else dispatch(resetPassword_error(error))
		}
	}
}

export function activateAccount(token) {
	return async function (dispatch) {
		dispatch({ type: "ACTIVATE_REQUEST" })

		try {
			const response = await UsersAPI.activateAccount(token)

			if (response.data && response.data.accessToken) {
				saveAuth(response.data)
				dispatch({
					type: "LOGIN_USER_SUCCESS",
					payload: response.data,
				})
			}

			dispatch({
				type: "ACTIVATE_SUCCESS",
				payload: response.data,
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

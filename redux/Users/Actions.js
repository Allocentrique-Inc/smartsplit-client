import * as UsersAPI from "../../api/Users"

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
			dispatch(resetPassword_success(response.data))
		} catch (error) {
			if (error.data) dispatch(resetPassword_error(error.data))
			else dispatch(resetPassword_error(error))
		}
	}
}

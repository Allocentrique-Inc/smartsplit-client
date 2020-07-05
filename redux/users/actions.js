import * as UsersAPI from "../../api/users"

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

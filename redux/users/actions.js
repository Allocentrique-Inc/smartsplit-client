import * as UsersAPI from "../../api/users"

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

const INITIAL_STATE = {
	forgotPassword: {
		data: null,
		error: null,
		isLoading: false,
	},
	passwordReset: {
		data: null,
		error: null,
		isLoading: false,
	},
}

export default function (state = INITIAL_STATE, action) {
	let newState = {}

	switch (action.type) {
		case "FORGOT_PASSWORD_REQUEST":
			newState.forgotPassword = {
				...state.forgotPassword,
				data: null,
				isLoading: true,
				error: null,
			}

			break

		case "FORGOT_PASSWORD_SUCCESS":
			newState.forgotPassword = {
				...state.forgotPassword,
				error: null,
				isLoading: false,
			}

			if (action.payload) newState.forgotPassword.data = action.payload
			else newState.forgotPassword.data = { message: "Success" }

			break

		case "FORGOT_PASSWORD_ERROR":
			newState.forgotPassword = {
				...state.forgotPassword,
				isLoading: false,
			}

			if (action.payload) newState.forgotPassword.error = action.payload

			break

		case "RESET_PASSWORD_REQUEST":
			newState.passwordReset = {
				...state.passwordReset,
				data: null,
				isLoading: true,
				error: null,
			}

			break

		case "RESET_PASSWORD_SUCCESS":
			newState.passwordReset = {
				...state.passwordReset,
				error: null,
				isLoading: false,
			}

			if (action.payload) newState.passwordReset.data = action.payload

			break

		case "RESET_PASSWORD_ERROR":
			newState.passwordReset = {
				...state.passwordReset,
				isLoading: false,
			}

			if (action.payload) newState.passwordReset.error = action.payload

			break

		default:
			break
	}

	return { ...state, ...newState }
}

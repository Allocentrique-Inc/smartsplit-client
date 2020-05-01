const INITIAL_STATE = {
	registerUser: {
		data: null,
		error: null,
		isLoading: false,
	},
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
	activation: {
		data: null,
		error: null,
		isLoading: false,
	},
	updateUser: {
		data: null,
		error: null,
		isLoading: false,
	},
}

export default function (state = INITIAL_STATE, action) {
	let newState = {}

	switch (action.type) {
		case "REGISTER_USER_RESET":
			newState.registerUser = INITIAL_STATE.registerUser

			break

		case "REGISTER_USER_REQUEST":
			newState.registerUser = {
				...state.registerUser,
				data: null,
				isLoading: true,
				error: null,
			}

			break

		case "REGISTER_USER_SUCCESS":
			newState.registerUser = {
				...state.registerUser,
				error: null,
				isLoading: false,
			}

			if (action.payload) newState.registerUser.data = action.payload

			break

		case "REGISTER_USER_ERROR":
			newState.registerUser = {
				...state.registerUser,
				isLoading: false,
			}

			if (action.payload) newState.registerUser.error = action.payload

			break

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

		case "ACTIVATE_REQUEST":
			newState.activation = {
				data: null,
				isLoading: true,
				error: null,
			}

			break

		case "ACTIVATE_ERROR":
			newState.activation = {
				data: null,
				isLoading: false,
				error: action.payload,
			}

			break

		case "ACTIVATE_SUCCESS":
			newState.activation = {
				data: action.payload,
				isLoading: false,
				error: false,
			}

			break

		case "UPDATE_USER_REQUEST":
			newState.updateUser = {
				...state.updateUser,
				data: null,
				isLoading: true,
				error: null,
			}

			break

		case "UPDATE_USER_SUCCESS":
			newState.updateUser = {
				...state.updateUser,
				error: null,
				isLoading: false,
			}

			if (action.payload) newState.updateUser.data = action.payload

			break

		case "UPDATE_USER_ERROR":
			newState.updateUser = {
				...state.updateUser,
				isLoading: false,
			}

			if (action.payload) newState.updateUser.error = action.payload

			break

		default:
			break
	}

	return { ...state, ...newState }
}

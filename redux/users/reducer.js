const INITIAL_STATE = {
	passwordReset: {
		data: null,
		error: null,
		isLoading: false,
	},
}

export default function (state = INITIAL_STATE, action) {
	let newState = {}

	switch (action.type) {
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

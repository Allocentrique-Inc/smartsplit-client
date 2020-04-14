const INITIAL_STATE = {
	data: null,
	error: null,
	isLoading: false,
	isLoggedIn: false,
}

export default function (state = INITIAL_STATE, action) {
	const newState = {}

	switch (action.type) {
		case "LOGIN_USER_REQUEST":
			return {
				...state,
				data: null,
				isLoading: true,
				error: null,
			}

		case "LOGIN_USER_SUCCESS":
			if (action.payload) {
				newState.data = action.payload
				newState.isLoggedIn = true
			}

			return {
				...state,
				error: null,
				isLoading: false,
				...newState,
			}

		case "LOGIN_USER_ERROR":
			if (action.payload) newState.error = action.payload

			return {
				...state,
				isLoading: false,
				...newState,
			}

		case "LOGOUT_USER":
			return { ...state, ...INITIAL_STATE }

		default:
			return state
	}
}

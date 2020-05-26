const INITIAL_STATE = {
	accessToken: null,
	user_id: null,
	error: null,
	isLoading: false,
	isLoggedIn: null,
	isReturning: null,
}

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case "AUTH_LOGOUT":
			return {
				...INITIAL_STATE,
				isReturning: state.isReturning,
				isLoggedIn: false,
			}

		case "AUTH_LOADING":
			return { ...state, isLoading: true, error: null }

		case "AUTH_LOGIN":
			return {
				...state,
				isLoading: false,
				error: null,
				isReturning: true,
				isLoggedIn: true,
				accessToken: action.accessToken,
				user_id: action.user_id,
			}

		case "AUTH_ERROR":
			return { ...state, isLoading: false, error: action.error }

		case "AUTH_RETURNING":
			return { ...state, isReturning: true }

		default:
			return state
	}
}

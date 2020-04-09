const INITIAL_STATE = {
	data: null,
	error: null,
	isLoading: false
}

export default function(state = INITIAL_STATE, action) {
	const newState = {}
	
	switch (action.type) {
		case "REGISTER_USER_REQUEST":
			newState.data = null;
			newState.isLoading = true;
			newState.error = null;

			return {
				...state,
				data: null,
				isLoading: true,
				error: null
			}
		
		case "REGISTER_USER_SUCCESS":
			if(action.payload)
				newState.data = action.payload

			return {
				...state,
				error: null,
				isLoading: false,
				...newState
			}
		
		case "REGISTER_USER_ERROR":
			if(action.payload)
				newState.error = action.payload
			
			return {
				...state,
				isLoading: false,
				...newState
			}
		
		default:
			return state
	}
}

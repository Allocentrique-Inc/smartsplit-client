const INITIAL_STATE = {
	data: null,
	error: null,
	isLoading: false
};

const UsersReducer = (state = INITIAL_STATE, action) => {
	let newState = {};
	
	switch (action.type) {
		
	  case "REGISTER_USER_REQUEST":
		newState.data = null;
		newState.isLoading = true;
		newState.error = null;

		return {
		  ...state,
		  ...newState
		}
	  case "REGISTER_USER_SUCCESS":
		
		if (action.payload) {
			newState.data = action.payload;
		}

		newState.error = null;
		newState.isLoading = false;
  
		return {
		  ...state,
		  ...newState
		};
	  case "REGISTER_USER_ERROR":
		  
		if (action.payload) {
		  newState.error = action.payload;    
		}
		newState.isLoading = false;
		return {
			...state,
			...newState
		}
	  default:
		return state
	}
  };
  
export default UsersReducer;
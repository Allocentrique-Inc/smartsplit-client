const INITIAL_STATE = {
	items: [],
	error: null,
	isLoading: false
};

const RightHoldersReducer = (state = INITIAL_STATE, action) => {
	let newState = {};
	
	switch (action.type) {
		
	  case "GET_RIGHT_HOLDERS_REQUEST":
		newState.items = [];
		newState.isLoading = true;
		newState.error = null;

		return {
		  ...state,
		  ...newState
		}
	  case "GET_RIGHT_HOLDERS_SUCCESS":
		
		if (action.payload) {
			newState.items = action.payload;
		}

		newState.error = null;
		newState.isLoading = false;
  
		return {
		  ...state,
		  ...newState
		};
	  case "GET_RIGHT_HOLDERS_ERROR":
		  
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
  
export default RightHoldersReducer;
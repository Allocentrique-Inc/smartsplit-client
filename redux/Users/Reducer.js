const INITIAL_STATE = {
	registerUser:{
		data: null,
		error: null,
		isLoading: false
	},
	forgotPassword:{
		data: null,
		error: null,
		isLoading: false
	},
	passwordReset:{
		data: null,
		error: null,
		isLoading: false
	}
	
};

export default UsersReducer = (state = INITIAL_STATE, action) => {
	let newState = {};
	
	switch (action.type) {
		
		//#region Register user
		case "REGISTER_USER_REQUEST":
			newState.registerUser = {};

			newState.registerUser.data = null;
			newState.registerUser.isLoading = true;
			newState.registerUser.error = null;

			return {
			...state,
			...newState
			}

		case "REGISTER_USER_SUCCESS":
			
			if (action.payload) {
				newState.registerUser.data = action.payload;
			}

			newState.registerUser.error = null;
			newState.registerUser.isLoading = false;
	
			return {
			...state,
			...newState
			};

		case "REGISTER_USER_ERROR":
			
			if (action.payload) {
			newState.registerUser.error = action.payload;    
			}
			newState.registerUser.isLoading = false;
			return {
				...state,
				...newState
			}
		//#endregion
			
		//#region Forgot password
		case "FORGOT_PASSWORD_REQUEST":
			newState.forgotPassword.data = null;
			newState.forgotPassword.isLoading = true;
			newState.forgotPassword.error = null;

			return {
			...state,
			...newState
			}

		case "FORGOT_PASSWORD_SUCCESS":
			
			if (action.payload) {
				newState.forgotPassword.data = action.payload;
			}

			newState.forgotPassword.error = null;
			newState.forgotPassword.isLoading = false;
	
			return {
			...state,
			...newState
			};

		case "FORGOT_PASSWORD_ERROR":
			
			if (action.payload) {
			newState.forgotPassword.error = action.payload;    
			}
			newState.forgotPassword.isLoading = false;
			return {
				...state,
				...newState
			}
		//#endregion

		//#region Reset Password
		case "RESET_PASSWORD_REQUEST":
			newState.passwordReset = {};

			newState.passwordReset.data = null;
			newState.passwordReset.isLoading = true;
			newState.passwordReset.error = null;

			return {
			...state,
			...newState
			}

		case "RESET_PASSWORD_SUCCESS":
			newState.passwordReset = {};
			if (action.payload) {
				newState.passwordReset.data = action.payload;
			}

			newState.passwordReset.error = null;
			newState.passwordReset.isLoading = false;
	
			return {
			...state,
			...newState
			};

		case "RESET_PASSWORD_ERROR":
			newState.passwordReset = {};

			if (action.payload) {
				newState.passwordReset.error = action.payload;    
			}
			newState.passwordReset.isLoading = false;
			return {
				...state,
				...newState
			}
		//#endregion


		default:
			return state
	}
};
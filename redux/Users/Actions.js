import * as UsersAPI from "../../api/Users"

//#region Register user
export const registerUser_request = ()=>{
	return {
		type: "REGISTER_USER_REQUEST",
	}
}

export const registerUser_success = (data)=>{
	return {
		type: "REGISTER_USER_SUCCESS",
		payload: data
	}
}

export const registerUser_error = (err)=>{
	return {
		type: "REGISTER_USER_ERROR",
		payload: err
	}
}

export const registerUser = (user)=>{
	return (dispatch)=>{
		dispatch(registerUser_request());

		const getRequest = UsersAPI.registerUser(user);
		return getRequest.then((response)=>{
			dispatch( registerUser_success(response.data) );
		})
		.catch((error)=>{
			dispatch( registerUser_error(error) );
		});
	}
}
//#endregion


//#region Forgot password
export const forgotPassword_request = ()=>{
	return {
		type: "FORGOT_PASSWORD_REQUEST",
	}
}

export const forgotPassword_success = (data)=>{
	return {
		type: "FORGOT_PASSWORD_SUCCESS",
		payload: data
	}
}

export const forgotPassword_error = (err)=>{
	return {
		type: "FORGOT_PASSWORD_ERROR",
		payload: err
	}
}

export const forgotPassword = (user)=>{
	return (dispatch)=>{
		dispatch(forgotPassword_request());

		const getRequest = UsersAPI.forgotPassword(user);
		return getRequest.then((response)=>{
			dispatch( forgotPassword_success(response.data) );
		})
		.catch((error)=>{
			dispatch( forgotPassword_error(error) );
		});
	}
}
//#endregion


//#region Reset password
export const resetPassword_request = ()=>{
	return {
		type: "RESET_PASSWORD_REQUEST",
	}
}

export const resetPassword_success = (data)=>{
	return {
		type: "RESET_PASSWORD_SUCCESS",
		payload: data
	}
}

export const resetPassword_error = (err)=>{
	return {
		type: "RESET_PASSWORD_ERROR",
		payload: err
	}
}

export const resetPassword = (passwordDetails)=>{
	return (dispatch)=>{
		dispatch(resetPassword_request());

		const request = UsersAPI.passwordReset(passwordDetails);
		return request.then((response)=>{
			// if (response.data && response.data.accessToken) {
			// 	saveAuth(response.data);
			// }
			dispatch( resetPassword_success(response.data) );
		})
		.catch((error)=>{
			console.log("Error resetting password", error);
			dispatch( resetPassword_error(error) );
		});
	}
}
//#endregion
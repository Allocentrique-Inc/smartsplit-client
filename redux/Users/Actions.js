import * as UsersAPI from "../../api/Users"

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
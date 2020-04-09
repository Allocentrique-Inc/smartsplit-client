import * as UsersAPI from "../../api/Users"

export function registerUser_request() {
	return {
		type: "REGISTER_USER_REQUEST",
	}
}

export function registerUser_success(data) {
	return {
		type: "REGISTER_USER_SUCCESS",
		payload: data
	}
}

export function registerUser_error(err) {
	return {
		type: "REGISTER_USER_ERROR",
		payload: err
	}
}

export function registerUser(user) {
	return async function(dispatch) {
		dispatch(registerUser_request())
		
		try {
			const response = await UsersAPI.registerUser(user)
			dispatch(registerUser_success(response.data))
		} catch(error) {
			if(error.response)
				dispatch(registerUser_error(error.response.data))
			else
				dispatch(registerUser_error(error))
		}
	}
}

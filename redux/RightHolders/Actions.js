import * as RightHoldersAPI from "../../api/RightHolders"

export const getRightHolders_request = ()=>{
	return {
		type: "GET_RIGHT_HOLDERS_REQUEST",
	}
}

export const getRightHolders_success = (data)=>{
	return {
		type: "GET_RIGHT_HOLDERS_SUCCESS",
		payload: data
	}
}

export const getRightHolders_error = (err)=>{
	return {
		type: "GET_RIGHT_HOLDERS_ERROR",
		payload: err
	}
}

export const getRightHolders = ()=>{
	return (dispatch)=>{
		dispatch(getRightHolders_request());

		const getRequest = RightHoldersAPI.getRightHolders();
		return getRequest.then((response)=>{
			dispatch( getRightHolders_success(response.data) );
		})
		.catch((error)=>{
			dispatch( getRightHolders_error(error) );
		});
	}
}
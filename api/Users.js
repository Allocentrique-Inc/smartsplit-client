import { axiosClient } from "./ApiClient"

export function registerUser(data, axiosConfig = {}) {
	return axiosClient.request({
		url: "/users",
		method: "post",
		data,
		...axiosConfig,
	})
}

export function forgotPassword(data, axiosConfig = {}) {
	return axiosClient.request({
		url: "/users/request-password-reset",
		method: "post",
		data,
		...axiosConfig,
	})
}

export function passwordReset(data, axiosConfig = {}) {
	return axiosClient.request({
		url: "/users/change-password",
		method: "post",
		data,
		...axiosConfig,
	})
}

export function activateAccount(token) {
	return axiosClient.request({
		url: "/users/activate",
		method: "post",
		data: { token },
	})
}

export function updateUser(details, axiosConfig = {}) {
	if (!details.user_id) return Promise.reject("Aucun id fournis")
	return axiosClient.request({
		url: `/users/${details.user_id}`,
		method: "patch",
		data: details,
		...axiosConfig,
	})
}
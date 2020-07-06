import { client, createCrudClient } from "./api-client"

export async function registerUser(data) {
	const result = await client.request({
		url: "/users/",
		method: "post",
		data,
	})

	return result.data
}

export function forgotPassword(email) {
	return client.request({
		url: "/users/request-password-reset",
		method: "post",
		data: { email },
	})
}

export function passwordReset(data) {
	return client.request({
		url: "/users/change-password",
		method: "post",
		data,
	})
}

export async function activateAccount(token) {
	const result = await client.request({
		url: "/users/activate",
		method: "post",
		data: { token },
	})

	return result.data
}

export function updateUser(details) {
	if (!details.user_id) return Promise.reject("Aucun id fournis")
	return client.request({
		url: `/users/${details.user_id}`,
		method: "patch",
		data: details,
	})
}

export async function verifyPhone(verificationCode) {
	const res = await client.post(`/users/verify-mobile-phone`, {
		verificationCode,
	})

	return res.data
}

export default createCrudClient("/users")

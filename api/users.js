import { client, createCrudClient } from "./api-client"

export async function registerUser(data) {
	const result = await client.request({
		url: "/users/",
		method: "post",
		data,
	})

	return result.data
}

export async function getEmail(email) {
	return await client.head(`/users/email/${encodeURI(email)}`)
}

export function forgotPassword(email) {
	return client.request({
		url: "/users/request-password-reset",
		method: "post",
		data: { email },
	})
}

export async function resetPassword(token, password) {
	const result = await client.request({
		url: "/users/change-password",
		method: "post",
		data: { token, password },
	})

	return result.data
}

export async function changePassword(currentPassword, password) {
	const result = await client.request({
		url: "/users/change-password",
		method: "post",
		data: { currentPassword, password },
	})

	return result.data
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

export async function inviteNewUser(data) {
	const result = await client.request({
		url: "/users/invite-new-user",
		method: "post",
		data,
	})

	return result.data
}

export default createCrudClient("/users")

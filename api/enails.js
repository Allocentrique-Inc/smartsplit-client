import { client } from "./api-client"

export async function getEmails(userId) {
	return client.get(`/users/${userId}/emails/`)
}

export async function addEmail(userId, data) {
	return await client.request({
		url: `/users/${userId}/emails/`,
		method: "post",
		data,
	})
}

export async function setEmailAsPrimary(userId, email) {
	return await client.request({
		url: `/users/${userId}/emails/primary`,
		method: "post",
		data: {
			email: email,
		},
	})
}

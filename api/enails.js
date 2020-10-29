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

import { client } from "./api-client"

export async function getEmails(userId) {
	return client.get(`/users/${userId}/emails/`)
}

import { client } from "./api-client"

/**
 * a crud based on a user to access the contributor api endpoints
 */
export default class CollaboratorsApi {
	type = "collaborators"
	userId
	constructor(userId) {
		this.userId = userId
	}
	async create(data) {
		const response = await client.post(
			`/users/${this.userId}/${this.type}/`,
			data
		)
		return response.data
	}
	async list() {
		const response = await client.get(`/users/${this.userId}/${this.type}/`)
		return response.data
	}
	async read(id) {
		const response = await client.get(
			`/users/${this.userId}/${this.type}/${id}`
		)
		return response.data
	}

	async delete(id) {
		const response = await client.delete(
			`/users/${this.userId}/${this.type}/${id}`
		)
		return response.data
	}
}

import CollaboratorsApi from "./collaborators"

/**
 * a crud based on a user to access the contributor api endpoints
 */
export default class ContributorsApi extends CollaboratorsApi {
	type = "contributors"
	async upgrade(id) {
		const response = await client.post(
			`/users/${this.userId}/contributors/${id}/upgrade/`,
			data
		)
		return response.data
	}
}

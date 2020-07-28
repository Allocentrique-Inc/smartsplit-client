import { client, createCrudClient } from "./api-client"

export default createCrudClient("/workpieces")

export async function listForUser(user_id) {
	if (!user_id) {
		throw new Error("Attempting to fetch workpieces by a null user")
	}

	const response = await client.request(`/workpieces/by-owner/${user_id}/`)
	return response.data
}

export async function uploadFileToWorkpiece(
	workpiece_id,
	metadata,
	base64File
) {
	const result = await client.request({
		method: "post",
		url: `/workpieces/${workpiece_id}/files/`,
		data: {
			...metadata,
			data: base64File,
		},
	})

	return result.data
}

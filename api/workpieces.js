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

export async function createNewRightsSplits(workpiece_id, rightsSplits) {
	const result = await client.request({
		method: "post",
		url: `/workpieces/${workpiece_id}/rightSplit`,
		data: rightsSplits,
	})

	return result.data
}

export async function updateRightsSplits(workpiece_id, rightsSplits) {
	const result = await client.request({
		method: "put",
		url: `/workpieces/${workpiece_id}/rightSplit`,
		data: rightsSplits,
	})

	return result.data
}

export async function saveDocumentation(workpieceId, section, data) {
	let url = `/workpieces/${workpieceId}/documentation`
	if (section) {
		url += `/${section}`
	}
	console.log(`API patch top save documentation is "${url}"`)
	return await client.request({
		method: "patch",
		url: url,
		data: data,
	})
}

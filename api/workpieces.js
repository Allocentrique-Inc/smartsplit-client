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
	console.log(`API patch to save documentation is "${url}"`)
	return await client.request({
		method: "patch",
		url: url,
		data: data,
	})
}

export async function getDocumentation(workpieceId, section) {
	let url = `/workpieces/${workpieceId}/documentation`
	if (section) {
		url += `/${section}`
	}
	console.log(`API patch to get documentation is "${url}"`)
	return await client.request({
		method: "get",
		url: url,
	})
}

export async function saveProtection(workpieceId, section, data) {
	let url = `/workpieces/${workpieceId}/protect`
	if (section) {
		url += `/${section}`
	}
	var bodyFormData = new FormData()
	bodyFormData.append("file", data.file)

	console.log(`API patch to save documentation is "${url}"`)
	return await client.request({
		method: "patch",
		url: url,
		data: data,
	})
}

export async function getProtection(workpieceId, section) {
	let url = `/workpieces/${workpieceId}/documentation`
	if (section) {
		url += `/${section}`
	}
	console.log(`API patch to get protect is "${url}"`)
	return await client.request({
		method: "get",
		url: url,
	})
}

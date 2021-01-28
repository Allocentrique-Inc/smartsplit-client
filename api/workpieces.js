import { client, createCrudClient } from "./api-client"
import { action, runInAction } from "mobx"
import { API_BASE_URL } from "../config"

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

export async function createRightSplits(workpiece_id, data) {
	const result = await client.request({
		method: "post",
		url: `/workpieces/${workpiece_id}/rightSplit`,
		data: data,
	})

	return result
}

export async function updateRightSplits(workpiece_id, data) {
	const result = await client.request({
		method: "put",
		url: `/workpieces/${workpiece_id}/rightSplit`,
		data: data,
	})

	return result
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
export async function docFileList(workpiece_id) {
	const result = await client.request({
		method: "get",
		url: `/workpieces/${workpiece_id}/documentation/files`,
	})
	return result.data
}
export async function uploadDocFile(
	workpieceId,
	file,
	type,
	visibility = "private",
	onProgress
) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()

		// listen for `upload.load` event
		xhr.upload.onload = () => {
			console.log(`The upload is completed: ${xhr.status} ${xhr.response}`)
			console.log(xhr.response)
			console.log(xhr.responseText)
			xhr.responseType
			resolve(xhr.response)
		}
		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				console.log(xhr.responseText)
			}
		})

		// listen for `upload.error` event
		xhr.upload.onerror = (e) => {
			console.error("Upload failed.")
			reject(e)
		}

		// listen for `upload.abort` event
		xhr.upload.onabort = () => {
			console.error("Upload cancelled.")
			reject()
		}

		// listen for `progress` event
		xhr.upload.onprogress = (event) =>
			runInAction(() => {
				console.log(event.loaded / event.total)
				onProgress(event.loaded / event.total)
			})

		// open request
		xhr.open(
			"POST",
			`${API_BASE_URL}/workpieces/${workpieceId}/documentation/files/${type}/`
		)

		xhr.setRequestHeader(
			"Authorization",
			client.defaults.headers.common["Authorization"]
		)
		// prepare a file object
		//const files = document.querySelector("[name=file]").files
		const formData = new FormData()
		formData.append("file", file.file, file.file.name)
		formData.append("visibility", visibility)

		// send request
		xhr.send(formData)
	})
}

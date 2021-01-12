import { createCrudClient, client } from "./api-client"

export async function listEntities(type) {
	return await client.get(`/entities/${type}/`)
}

export async function searchEntities(type, search, limit = 10) {
	if (!search) return []
	let response = await client.get(
		`/entities/${type}/?limit=${limit}&search_terms=${search}`
	)
	return response.data
}

export async function createEntity(data, type) {
	return await client.post(`/entities/${type}/`, data)
}

export default createCrudClient(`/entities`)

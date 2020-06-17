import { createCrudClient, client } from "./api-client"

export async function listEntities(type) {
	return await client.get(`/entities/${type}/`)
}

export async function createEntity(data, type) {
	return await client.post(`/entities/${type}/`, data)
}

export default createCrudClient(`/entities`)

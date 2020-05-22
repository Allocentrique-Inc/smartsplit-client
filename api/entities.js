import { createCrudClient, client } from "./api-client"


export async function listEntities(type) {
	return await client.get(`/entities/${type}/`)
}

export default createCrudClient(`/entities`)
import axios from "axios"
import { API_BASE_URL } from "../config"

let globalErrorHandler = () => {}

export const client = axios.create({
	baseURL: API_BASE_URL,
})

client.interceptors.response.use(
	function (response) {
		return response
	},
	function (error) {
		// Si c'est une erreur 401, il s'agit d'une erreur d'autorisation
		if (error.response && error.response.status === 401) {
			globalErrorHandler(error.response.data)
		}

		// Si on a un response, et qu'elle contient du data, alors on utilise le data comme erreur
		if (error.response && error.response.data) {
			// L'API retourne un {code, message}
			return Promise.reject(error.response.data)
		}

		// Sinon on renvoie l'erreur originale
		else {
			return Promise.reject(error)
		}
	}
)

export function setGlobalErrorHandler(handler) {
	globalErrorHandler = handler
}

export function setGlobalAccessToken(accessToken) {
	if (accessToken) {
		console.log("auth.accessToken is set")
		client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
	} else {
		console.log("auth.accessToken is NOT set")
		delete client.defaults.headers.common["Authorization"]
	}
}

export function createCrudClient(endpoint) {
	async function create(data) {
		const result = await client.post(`${endpoint}/`, data)
		return result.data
	}

	async function read(id) {
		const result = await client.get(`${endpoint}/${id}`)
		return result.data
	}

	async function replace(id, data) {
		const result = await client.put(`${endpoint}/${id}`, data)
		return result.data
	}

	async function update(id, data) {
		const result = await client.patch(`${endpoint}/${id}`, data)
		return result.data
	}

	async function destroy(id) {
		const result = await client.delete(`${endpoint}/${id}`)
		return result.data
	}

	return { create, read, replace, update, destroy }
}

export function createEntityCrud(type) {
	async function create(data) {
		const result = await client.post(`entities/${type}`, data)
		return result.data
	}

	async function read(id) {
		const result = await client.get(`entities/${id}`)
		return result.data
	}

	async function replace(id, data) {
		const result = await client.put(`entities/${id}`, data)
		return result.data
	}

	async function update(id, data) {
		const result = await client.patch(`entities/${type}/${id}`, data)
		return result.data
	}

	async function destroy(id) {
		const result = await client.delete(`entities/${id}`)
		return result.data
	}

	return { create, read, replace, update, destroy }
}

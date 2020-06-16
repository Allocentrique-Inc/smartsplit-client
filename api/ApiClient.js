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
		client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
	} else {
		delete client.defaults.headers.common["Authorization"]
	}
}

export function createCrudClient(endpoint) {
	async function create(data) {
		return await client.post(endpoint, data)
	}

	async function read(id) {
		return await client.get(`${endpoint}/${id}`)
	}

	async function replace(id, data) {
		return await client.put(`${endpoint}/${id}`, data)
	}

	async function update(id, data) {
		return await client.patch(`${endpoint}/${id}`, data)
	}

	async function destroy(id) {
		return await client.delete(`${endpoint}/${id}`)
	}

	return { create, read, replace, update, destroy }
}

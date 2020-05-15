import axios from "axios"
import { API_BASE_URL } from "../config"

export const axiosClient = axios.create({
	baseURL: API_BASE_URL,
})
axiosClient.interceptors.response.use(
	function (response) {
		return response
	},
	function (error) {
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

export const client = axiosClient

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

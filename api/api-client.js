import axios from "axios"
import { API_BASE_URL } from "../config"
import { watch } from "../redux/utils"

let unsubscribeRedux = () => {}
let dispatch = () => {}

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
			dispatch({ type: "AUTH_LOGOUT", error: error.response.data })
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

export function connectToRedux(store) {
	unsubscribeRedux()
	unsubscribeRedux = watch(
		store,
		(state) => state.auth && state.auth.accessToken,
		(accessToken) => {
			client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
		}
	)

	dispatch = store.dispatch.bind(store)
}

export function createCrudClient(endpoint) {
	async function create(data) {
		return await client.post(`${endpoint}/`, data)
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

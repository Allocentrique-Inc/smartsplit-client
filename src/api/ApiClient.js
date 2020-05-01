import axios from "axios"
import { API_BASE_URL } from "../../config"

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

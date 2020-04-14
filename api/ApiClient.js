import axios from "axios"
import { API_BASE_URL } from "../config"

export const axiosClient = axios.create({
	baseURL: API_BASE_URL
});
axiosClient.interceptors.response.use((response) => {
	return response;
}, function (error) {
	// https://github.com/axios/axios#handling-errors
	// error.response = requete envoyé, reçu une réponse autre que 200.
	// cas le plus commun
	if (error.response) {
		return Promise.reject(error.response)
	// error.request = requete envoyé, pas reçu de réponse (offline?)
	} else if (error.request) {
		return Promise.reject(error.request)
	// error.message = requete jamais même envoyé
	} else {
		return Promise.reject(error.message)
	}
})
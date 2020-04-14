import axios from "axios"
import { API_BASE_URL } from "../config"

export const axiosClient = axios.create({
	baseURL: API_BASE_URL
});
axiosClient.interceptors.response.use((response) => {
	return response;
}, function (error) {
	if (error.response) {
		return Promise.reject(error.response)
	} else if (error.request) {
		return Promise.reject(error.request)
	} else {
		return Promise.reject(error.message)
	}
})
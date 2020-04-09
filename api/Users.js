import axios from "axios"
import { API_BASE_URL } from "../config"

export function registerUser(data, axiosConfig = {}) {
	return axios.request({
		url: API_BASE_URL + '/users',
		method: 'post',
		data,
		...axiosConfig
	})
}

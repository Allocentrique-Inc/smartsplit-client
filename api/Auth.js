import axios from "axios"
import { API_BASE_URL } from "../config"

export function loginUser(data, axiosConfig = {}) {
	return axios.request({
		url: `${API_BASE_URL}/auth/login`,
		method: 'post',
		data,
		...axiosConfig
	})
}

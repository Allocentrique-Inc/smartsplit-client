import axios from "axios"
import { API_BASE_URL } from "../config"

export function getRightHolders(axiosConfig = {}) {
	return axios.request({
		url: API_BASE_URL + '/rightHolders',
		method: 'get',
		...axiosConfig
	})
}

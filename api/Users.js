import axios from "axios"
import { API_BASE_URL } from "../config"

export function registerUser(data, axiosConfig = {}) {
	return axios.request({
		url: `${API_BASE_URL}/users`,
		method: "post",
		data,
		...axiosConfig,
	})
}

export function forgotPassword(data, axiosConfig = {}) {
	return axios.request({
		url: `${API_BASE_URL}/users/request-password-reset`,
		method: "post",
		data,
		...axiosConfig,
	})
}

export function passwordReset(data, axiosConfig = {}) {
	return axios.request({
		url: `${API_BASE_URL}/users/change-password`,
		method: "post",
		data,
		...axiosConfig,
	})
}

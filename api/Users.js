import axios from "axios"
import {API_BASE_URL} from "../config"

const registerUser = (data, axiosConfig = {})=>{
	const defConfig = {
		url: API_BASE_URL + 'user',
		method: 'post',
		data
	}
	const config = {...defConfig, ...axiosConfig}

	return axios.request(config)
}

const forgotPassword = (data, axiosConfig = {})=>{
	const defConfig = {
		url: `${API_BASE_URL}user/password-reset`,
		method: 'post',
		data
	}
	const config = {...defConfig, ...axiosConfig}

	return axios.request(config)
}

const passwordReset = (data, axiosConfig = {})=>{
	/*
	Data attendu = {
		token: string,
		password: string
	}
	*/

	const defConfig = {
		url: `${API_BASE_URL}users/change-password`,
		method: 'post',
		data
	}
	const config = {...defConfig, ...axiosConfig}

	return axios.request(config)
}

export {registerUser, forgotPassword, passwordReset}

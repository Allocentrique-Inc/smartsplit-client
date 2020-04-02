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

export {registerUser}

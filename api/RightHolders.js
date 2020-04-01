import axios from "axios"
import {API_BASE_URL} from "../config"

const getRightHolders = (axiosConfig = {})=>{
	const defConfig = {
		url: API_BASE_URL + 'rightHolders',
		method: 'get'

	}
	const config = {...defConfig, ...axiosConfig}

	return axios.request(config)
}

export {getRightHolders}

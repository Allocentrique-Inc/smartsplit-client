import { AsyncStorage } from 'react-native';
import { loginUser_success } from "../redux/Auth/Actions";
import axios from "axios"

export async function loadAuthFromStorage(store) {
	const credentials = await AsyncStorage.getItem('user')
	
	if(!credentials)
		return

	const parsedCreds = JSON.parse(credentials)
	store.dispatch(loginUser_success(parsedCreds))
	
	if (parsedCreds.accessToken) {
		axios.defaults.headers.common['Authorization']
			= `Bearer ${parsedCreds.accessToken}`
	}
}

export async function saveAuth(data) {
	if(data.accessToken) {
		axios.defaults.headers.common['Authorization']
			= `Bearer ${data.accessToken}`;
	}
	
	await AsyncStorage.setItem('user', JSON.stringify(data))
}

export async function clearAuth() {
	await AsyncStorage.removeItem('user')
	delete axios.defaults.headers.common['Authorization']
}

import { AsyncStorage } from "react-native"
import {axiosClient} from "../api/ApiClient"

export async function loadAuthFromStorage(store) {
	const credentials = await AsyncStorage.getItem("user")

	if (!credentials) return

	const parsedCreds = JSON.parse(credentials)
	store.dispatch({
		type: "LOGIN_USER_SUCCESS",
		payload: parsedCreds,
	})

	if (parsedCreds.accessToken) {
		axiosClient.defaults.headers.common[
			"Authorization"
		] = `Bearer ${parsedCreds.accessToken}`
	}
}

export async function saveAuth(data, rememberMe) {
	if (data.accessToken) {
		axiosClient.defaults.headers.common[
			"Authorization"
		] = `Bearer ${data.accessToken}`
	}

	if (rememberMe) {
		await AsyncStorage.setItem("user", JSON.stringify(data))
	}
}

export async function clearAuth() {
	await AsyncStorage.removeItem("user")
	delete axiosClient.defaults.headers.common["Authorization"]
}

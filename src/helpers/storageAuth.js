import { AsyncStorage } from "react-native"
import { axiosClient } from "../api/ApiClient"
import { Platform } from "react-native"

export async function loadAuthFromStorage(store) {
	let credentials = await AsyncStorage.getItem("user")

	if (!credentials && Platform.OS === "web" && window.sessionStorage)
		credentials = window.sessionStorage.getItem("user")

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
	} else if (Platform.OS === "web" && window.sessionStorage) {
		window.sessionStorage.setItem("user", JSON.stringify(data))
	}
}

export async function clearAuth() {
	delete axiosClient.defaults.headers.common["Authorization"]

	if (Platform.OS === "web" && window.sessionStorage)
		window.sessionStorage.clear()

	await AsyncStorage.removeItem("user")
}

export async function loadIsReturningFromStorage(store) {
	const isReturning = await AsyncStorage.getItem("isReturning")

	if (isReturning)
		store.dispatch({
			type: "USER_RETURNING",
		})
}

export async function saveIsReturning() {
	await AsyncStorage.setItem("isReturning", "1")
}

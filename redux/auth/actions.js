import * as AuthAPI from "../../api/auth"
import { AsyncStorage } from "react-native"
import { Platform } from "react-native"
import { setUser } from "../users/actions"

export function initializeFromStorage(refreshToken = false) {
	return async function (dispatch) {
		dispatch({ type: "AUTH_LOADING" })

		AsyncStorage.getItem("isReturning")
			.then((value) => {
				dispatch({ type: "AUTH_RETURNING", state: value === "1" })
			})
			.catch((e) =>
				console.error("Error getting user is returning state from storage:", e)
			)

		let auth = null

		try {
			auth = await AsyncStorage.getItem("auth")

			if (!auth && Platform.OS === "web" && window.sessionStorage) {
				auth = window.sessionStorage.getItem("auth")
			}

			if (auth) {
				auth = JSON.parse(auth)
			}
		} catch (e) {
			dispatch(logout())
			dispatch(error(e))
			return
		}

		if (auth) {
			dispatch(setLogin(auth.accessToken, auth.user_id))

			if (refreshToken) {
				dispatch(refresh())
			}
		} else {
			dispatch(logout())
		}
	}
}

export function login(username, password, rememberMe) {
	return async function (dispatch) {
		dispatch({ type: "AUTH_LOADING" })

		try {
			const response = await AuthAPI.login(
				username,
				password,
				rememberMe ? "30 days" : "2 hours"
			)

			const user = response.user
			const user_id = (user && user.user_id) || response.user_id

			if (user) {
				dispatch(setUser(user_id, user))
			}

			dispatch(setLogin(response.accessToken, user_id, rememberMe))
		} catch (e) {
			console.error("Error during login:", e)
			dispatch(error(e))
		}
	}
}

export function setLogin(accessToken, user_id, store = false) {
	const storeData = JSON.stringify({ accessToken, user_id })

	AsyncStorage.setItem("isReturning", "1").catch((e) =>
		console.error("Error saving user returning state to storage:", e)
	)

	if (store) {
		AsyncStorage.setItem("auth", storeData).catch((e) =>
			console.error("Error saving auth to storage:", e)
		)
	} else if (Platform.OS === "web" && window.sessionStorage) {
		window.sessionStorage.setItem("auth", storeData)
	}

	return { type: "AUTH_LOGIN", accessToken, user_id }
}

export function error(error) {
	return { type: "AUTH_ERROR", error }
}

export function refresh() {
	return async function (dispatch, getState) {
		try {
			const response = await AuthAPI.refresh()
			const user = response.user
			const user_id = (user && user.user_id) || response.user_id

			if (user) {
				dispatch(setUser(user_id, user))
			}

			dispatch(setLogin(response.accessToken, user_id))
		} catch (e) {
			// L'appel à refresh() aura déjà invalidé les logins, donc rien à gérer
		}
	}
}

export function logout() {
	if (Platform.OS === "web" && window.sessionStorage)
		window.sessionStorage.clear()

	AsyncStorage.removeItem("auth").catch((e) =>
		console.error("Error clearing auth data:", e)
	)

	return { type: "AUTH_LOGOUT" }
}

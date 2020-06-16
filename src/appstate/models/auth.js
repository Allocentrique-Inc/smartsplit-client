import { Observable } from "../store"
import { Platform, AsyncStorage } from "react-native"
import * as AuthAPI from "../../../api/auth"

export class Authentication extends Observable {
	constructor() {
		super()

		this.isLoading = false
		this.error = null

		this.isLoggedIn = null
		this.isReturning = null
		this.accessToken = null
		this.user_id

		Object.defineProperty(this, "user", {
			enumerable: false,
			configurable: false,
			get: () => this.user_id && this.store.users.get(this.user_id),
		})
	}

	async initializeFromStorage(refreshToken = false) {
		this.set({ isLoading: true, error: null })

		AsyncStorage.getItem("isReturning")
			.then((value) => {
				this.set({ isReturning: value === 1 })
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
			this.logout(e)
			return
		}

		if (auth) {
			this.setLogin(auth.accessToken, auth.user_id)

			if (refreshToken) this.refresh()
		} else {
			this.logout()
		}
	}

	async login(username, password, rememberMe) {
		this.set({ isLoading: true, error: null })

		try {
			const response = await AuthAPI.login(
				username,
				password,
				rememberMe ? "30 days" : "2 hours"
			)

			this._setLoginFromAPI(response, rememberMe)
		} catch (e) {
			console.error("Error during login:", e)
			this.set({ isLoading: false, error: e })
		}
	}

	async refresh() {
		try {
			const response = await AuthAPI.refresh()
			this._setLoginFromAPI(response)
		} catch (e) {
			// L'appel à refresh() aura déjà invalidé les logins, donc rien à gérer
		}
	}

	_setLoginFromAPI(response, rememberMe) {
		const user = response.user
		const user_id = (user && user.user_id) || response.user_id

		this.setLogin(response.accessToken, user_id, rememberMe)

		if (user) {
			this.user.set({ data: user, state: "ready" })
		}
	}

	setLogin(accessToken, user_id, store = false) {
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

		this.set({
			isLoading: false,
			error: null,
			isLoggedIn: true,
			isReturning: true,
			accessToken,
			user_id,
		})
	}

	logout(error = null) {
		this.set({
			isLoading: false,
			isLoggedIn: false,
			accessToken: null,
			error: error,
		})

		if (Platform.OS === "web" && window.sessionStorage) {
			window.sessionStorage.clear()
		}

		AsyncStorage.removeItem("auth").catch((e) =>
			console.error("Error clearing auth data:", e)
		)
	}
}

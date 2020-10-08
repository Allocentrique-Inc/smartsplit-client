import { Observable } from "../store"
import { Platform, AsyncStorage } from "react-native"
import * as AuthAPI from "../../../api/auth"
import {
	activateAccount,
	resetPassword,
	changePassword,
} from "../../../api/users"

export class Authentication extends Observable {
	constructor(users) {
		super()

		this.isLoading = false
		this.error = null

		this.isLoggedIn = null
		this.isReturning = null
		this.isAuthStored = false
		this.accessToken = null
		this.user_id = null

		Object.defineProperty(this, "user", {
			enumerable: false,
			configurable: false,
			get: () => this.user_id && users.get(this.user_id),
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
		let isStored = true

		try {
			auth = await AsyncStorage.getItem("auth")

			if (!auth && Platform.OS === "web" && window.sessionStorage) {
				auth = window.sessionStorage.getItem("auth")
				isStored = false
			}

			if (auth) {
				auth = JSON.parse(auth)
			}
		} catch (e) {
			this.logout(e)
			return
		}

		if (auth) {
			this.setLogin(auth.accessToken, auth.user_id, isStored)

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
			this.set({ isLoading: true, error: null })
			const response = await AuthAPI.refresh()
			this._setLoginFromAPI(response)
		} catch (e) {
			// L'appel à refresh() aura déjà invalidé les logins, donc rien à gérer
		}
	}

	_setLoginFromAPI(response, rememberMe = undefined) {
		const user = response.user
		const user_id = (user && user.user_id) || response.user_id

		this.setLogin(response.accessToken, user_id, rememberMe)

		if (user) {
			this.user.set({ data: user, state: "ready" })
		}
	}

	setLogin(accessToken, user_id, store = undefined) {
		store = store === undefined ? this.isAuthStored : !!store
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
			isAuthStored: store,
			error: null,
			isLoggedIn: true,
			isReturning: true,
			accessToken,
			user_id,
		})
	}

	logout(error = null) {
		//console.log("old-logout being called")
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

	async activateAccountAndLogin(token) {
		let stayLoggedIn = false

		try {
			stayLoggedIn = !!(await AsyncStorage.getItem("register:stayLoggedInNext"))
		} catch (e) {
			console.error("Failed getting stay logged in status after activation", e)
		}

		const result = await activateAccount(token)
		this._setLoginFromAPI(result, stayLoggedIn)
	}

	async changePassword(currentPassword, newPassword) {
		const result = await changePassword(currentPassword, newPassword)
		this._setLoginFromAPI(result)
	}

	async resetPasswordAndLogin(token, password) {
		const result = await resetPassword(token, password)
		this._setLoginFromAPI(result)
	}
}

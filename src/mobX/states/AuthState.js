import BaseState, { save, session } from "../BaseState"
import { observable, computed, action, when, reaction, runInAction } from "mobx"
import { Platform, AsyncStorage } from "react-native"
import * as AuthAPI from "../../../api/auth"
import {
	setGlobalAccessToken,
	setGlobalErrorHandler,
} from "../../../api/api-client"
import {
	activateAccount,
	resetPassword,
	changePassword,
} from "../../../api/users"
import RegisterModel from "../models/auth/RegisterModel"
import { useHistory } from "react-router"
import PasswordModel from "../models/auth/PasswordModel"
import ChangePasswordModel from "../models/auth/ChangePasswordModel"
/**
 * AuthState observable class
 *
 */
export default class AuthState extends BaseState {
	//history
	reInitializeOnAuth = false
	constructor(root) {
		super(root)
		this.tokenChanged = reaction(
			() => this.accessToken,
			(token) => {
				//console.log("accessToken change reaction")
				setGlobalAccessToken(token)
			}
		)
		setGlobalErrorHandler((e) => this.logout(e))
	}
	tokenChanged
	@observable isLoading = false
	@observable error = null
	@observable isLoggedIn = null

	@save
	@observable
	isReturning = false

	@session
	@observable
	accessToken = null

	@session
	@observable
	user_id = null

	@observable regModel: RegisterModel = null
	@observable resetModel: PasswordModel = null
	@observable changePassModel: ChangePasswordModel = null

	@computed get user() {
		return this.user_id && this.root.users.get(this.user_id)
	}
	@computed get isAuthStored() {
		return Platform.OS === "web"
	}
	@action async init(refreshToken = false) {
		//console.log("AuthState::init called")
		//console.log(`access token is ${this.accessToken}`)
		//this.history = useHistory()
		this.regModel = new RegisterModel()
		this.regModel.init()
		this.resetModel = new PasswordModel()
		this.resetModel.init()
		this.changePassModel = new ChangePasswordModel()
		this.changePassModel.init()
		if (this.accessToken) {
			//setGlobalAccessToken(this.accessToken)
			this.isReturning = true
			if (refreshToken) this.refresh()
			else {
				this.isLoggedIn = true
				this.isLoading = false
			}
		} else this.logout()
	}

	@action async login(username, password, rememberMe) {
		this.isLoading = true
		this.error = null

		try {
			const response = await AuthAPI.login(
				username,
				password,
				rememberMe ? "30 days" : "2 hours"
			)

			this.setLoginFromAPI(response, rememberMe)
		} catch (e) {
			console.error("Error during login:", e)
			runInAction(() => {
				this.isLoading = false
				this.error = e
			})
		}
	}

	async refresh() {
		this.isLoading = true
		this.error = null
		try {
			const response = await AuthAPI.refresh()
			this.setLoginFromAPI(response)
		} catch (e) {
			// L'appel à refresh() aura déjà invalidé les logins, donc rien à gérer
		}
	}

	@action setLoginFromAPI(response, rememberMe = undefined) {
		const user = response.user
		const user_id = (user && user.user_id) || response.user_id
		this.setLogin(response.accessToken, user_id, rememberMe)
		/**
		 * this should be triggered by the setting of this.user_id
		 * it's a bit convoluted but the idea is to refrain from
		 * having copies of data -- so the user's entry is still
		 * the same one in the users list
		 */
		when(
			() => this.user,
			() => {
				//console.log("computed user has changed")
				this.user.data = user
				this.user.state = "ready"
			}
		)
	}

	@action setLogin(accessToken, user_id) {
		this.isLoading = false
		this.error = null
		this.isLoggedIn = true
		this.isReturning = true
		this.accessToken = accessToken
		this.user_id = user_id
	}

	@action logout(error = null) {
		//console.log("logout called")
		this.isLoading = false
		this.isLoggedIn = false
		this.accessToken = null
		this.user_id = null
		this.error = error

		/*
    
    MAY NEED THIS CODE IF LOGOUT DOES NOT CLEAR THE SESSION VALUE
    
    if (Platform.OS === "web" && window.sessionStorage) {
			window.sessionStorage.clear()
		}

		AsyncStorage.removeItem("auth").catch((e) =>
			console.error("Error clearing auth data:", e)
		)
		
		*/
	}

	@action async submitRegistration() {
		let validity = await this.regModel.validate()
		if (validity) {
			try {
				let success = await this.regModel.submit()
				if (success) {
					//this.clearRegister()
					return true
				}
			} catch (e) {}
		}
		return false
	}

	async activateAccountAndLogin(token) {
		let stayLoggedIn = false

		try {
			stayLoggedIn = !!(await AsyncStorage.getItem("register:stayLoggedInNext"))
		} catch (e) {
			console.error("Failed getting stay logged in status after activation", e)
		}

		const result = await activateAccount(token)
		this.setLoginFromAPI(result, stayLoggedIn)
	}

	@action async doPasswordChange() {
		this.changePassModel.saveError = null

		await this.changePassModel.validate()
		if (this.changePassModel.isValid) {
			runInAction(() => (this.changePassModel.busy = true))
			try {
				await this.changePassword(
					this.changePassModel.currentPassword.value,
					this.changePassModel.password.value
				)
				return true
			} catch (e) {
				if (e.code === "user_invalid_current_password") {
					runInAction(() => {
						this.changePassModel.currentPassword.error =
							"errors:invalidCurrentPassword"
					})
				} else {
					this.changePassModel.saveError = e
				}
				runInAction(() => (this.changePassModel.busy = false))
				return false
			}
		}
	}
	async changePassword(currentPassword, newPassword) {
		const result = await changePassword(currentPassword, newPassword)
		this.setLoginFromAPI(result)
	}

	@action async doPasswordResetAndRedirect(token, history) {
		await this.resetModel.validate()
		if (this.resetModel.isValid) {
			runInAction(() => (this.resetModel.busy = true))
			try {
				await this.resetPasswordAndLogin(token, this.resetModel.password.value)
				runInAction(() => (this.resetModel.busy = false))
				history.push("/")
			} catch (e) {
				let error
				switch (e.code) {
					case "user_invalid_reset_token":
						error = "errors:invalidToken"
						break
					default:
						error = e.error || e.message
				}

				runInAction(() => {
					this.resetModel.saveError = error
					this.resetModel.busy = false
				})
			}
		}
	}
	async resetPasswordAndLogin(token, password) {
		const result = await resetPassword(token, password)
		this.setLoginFromAPI(result)
	}
}

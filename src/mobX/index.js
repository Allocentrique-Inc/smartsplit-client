import React from "react"
import { isObservable, observable, runInAction, when } from "mobx"
import TestCountState from "./states/TestCountState"
import TestState from "./states/TestState"
import UserState from "./states/UserState"
import AuthState from "./states/AuthState"
import AdminState from "./states/AdminState"
import WorkpieceState from "./states/WorkpieceState"
import ContributorsState from "./states/ContributorsState"
import CollaboratorsState from "./states/CollaboratorsState"
import SplitsPagesState from "./states/SplitsPagesState"
import SettingsState from "./states/SettingsState"
/**
 * L'instance de base est passé a tout les sub-stores pour que chaque store
 * aie accès aux autres branches
 */
class RootStore {
	constructor() {
		this.init()
	}
	@observable initialized = false
	counts = new TestCountState(this)
	test = new TestState(this)
	users = new UserState(this)
	auth = new AuthState(this)
	admin = new AdminState(this)
	workpieces = new WorkpieceState(this)
	collaborators = new CollaboratorsState(this)
	contributors = new ContributorsState(this)
	splitsPages = new SplitsPagesState(this)
	settings = new SettingsState(this)
	async init(postLogin = false) {
		await this.users.init()
		if (!postLogin) await this.auth.init(true)
		await this.test.init()
		await this.counts.init()
		await this.admin.init()
		await this.workpieces.init()
		await this.collaborators.init()
		await this.contributors.init()
		await this.settings.init()
		runInAction(() => {
			this.initialized = true
		})

		if (!this.auth.isLoggedIn) {
			when(
				() => this.auth.isLoggedIn,
				() => this.init(true)
			)
		}
	}
}

/**
 * le context react qui permet l'accès globale
 * @type {React.Context<RootStore>}
 */

const stores = new RootStore()
export const storesContext = React.createContext(stores)
window.stores = stores

/**
 * Le hook principal pour accéder aux stores
 *
 * utlitisation:
 * const {test,bla} = useStore();
 *
 * @return {RootStore} l'instance du Root Store
 */
export const useStores = () => React.useContext(storesContext)

/**
 * Un hook pour accéder à des observables plus profondement dans l'arborescence
 *
 * utlitisation:
 * const {level1} = useStorePath("test","deep","level1");
 *
 * @param paths une série d'arguments variable en string qui denote le path dans l'arborescene
 * @return {*}
 */
export const useStorePath = (...paths) => {
	const stores = useStores()
	let error = false
	let current = stores
	paths.forEach((path) => {
		if (isObservable(current[path])) {
			current = current[path]
		} else {
			error = true
		}
	})
	//if (error) console.error("useStorePath: path was invalid")
	return error ? null : current
}

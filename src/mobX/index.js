import React from "react"
import { isObservable } from "mobx"
import TestCountState from "./states/TestCountState"
import TestState from "./states/TestState"

/**
 * L'instance de base est passé a tout les sub-stores pour que chaque store
 * aie accès aux autres branches
 */
class RootStore {
	counts = new TestCountState(this)
	test = new TestState(this)
}

/**
 * le context react qui permet l'accès globale
 * @type {React.Context<RootStore>}
 */
export const storesContext = React.createContext(new RootStore())

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
	if (error) console.error("useStorePath: path was invalid")
	return error ? null : current
}

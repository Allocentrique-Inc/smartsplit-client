import { observable, action, computed, flow as asyncAction } from "mobx"
import { createSaveDecorator } from "mobx-decorators"
import { AsyncStorage, Platform } from "react-native"
export default class BaseState {
	root
	/**
	 * Le constructeur initialize la connection aux root store
	 * pour que chaque store puissent accèder à tous les autres
	 *
	 * @param rootStore la référence au root
	 */
	constructor(rootStore) {
		this.root = rootStore
	}

	/**
	 * override this method for initializing data from the API
	 * @return {Promise<void>}
	 */
	@action
	async init(...args) {}
}

const platformStorage = Platform.OS === "web" ? sessionStorage : AsyncStorage

export const save = createSaveDecorator({
	storage: platformStorage,
	storeName: "Smart_Split",
})

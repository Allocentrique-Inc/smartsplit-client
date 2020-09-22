import {
	observable,
	action,
	computed,
	flow as asyncAction,
	decorate,
	toJS,
} from "mobx"
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

const platformSessionStorage =
	Platform.OS === "web" ? sessionStorage : AsyncStorage
const platformLocalStorage = Platform.OS === "web" ? localStorage : AsyncStorage

/**
 * Au lieu de se casser la tête à gérer le load des propriétés qui sont stockés
 * le AsyncStorage ou sessionStorage il n'y qu'a faire
 * import { observable } from "mobx"
 * import {save} from "../BaseState"
 *
 * class ExampleState {
 *
 *   @save
 *   @observable
 *   savedObservable
 *
 *   @observabvle
 *   unsavedObservable
 *
 * }
 *
 *
 *
 * @type {any}
 */
export const session = createSaveDecorator({
	storage: platformSessionStorage,
	storeName: "Smart_Split",
	onInitialized: (store, property, value) => {
		//console.log(`@save: onIntialized ${property} =  ${value}`)
	},
	onLoaded: (store, property, value) => {
		//console.log(`@save: onLoad ${property} =  ${value}`)
	},
	onSaved: (store, property, value) => {
		//console.log(`@save: onSave ${property} =  ${value}`)
	},
})

/**
 * Pour des proopriétés que on veux stocker long terme
 * le AsyncStorage ou localStorage il n'y qu'a faire
 * import { observable } from "mobx"
 * import {save} from "../BaseState"
 *
 * class ExampleState {
 *
 *   @save
 *   @observable
 *   savedObservable
 *
 *   @observabvle
 *   unsavedObservable
 *
 * }
 *
 *
 *
 * @type {any}
 */
export const save = createSaveDecorator({
	storage: platformLocalStorage,
	storeName: "Smart_Split",
	onInitialized: (store, property, value) => {
		console.log(`@save: onIntialized ${store}.${property} =  ${value}`)
	},
	onLoaded: (store, property, value) => {
		console.log(`@save: onLoad ${property} =  ${value}`)
	},
	onSaved: (store, property, value) => {
		console.log(`@save: onSave ${property} =  ${value}`)
	},
	serializer: {
		load: (data) => JSON.parse(data),
		save: (value) => JSON.stringify(toJS(value)),
	},
})

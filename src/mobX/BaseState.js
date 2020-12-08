import { action, toJS, reaction } from "mobx"
import { Platform, AsyncStorage } from "react-native"

export default class BaseState {
	root
	/**
	 * Le constructeur initialize la connection aux root store
	 * pour que chaque store puissent accèder à tous les autres
	 *
	 * @param rootStore la référence au root
	 */
	constructor(rootStore) {
		//makeObservable(this)
		this.root = rootStore
	}

	/**
	 * PROPS TO BE SYNC'D AND PERSIST IN LOCAL STORAGE AND THEIR INITIAL VALUES
	 *
	 * Override this object to mark properties that should be synced with
	 * local storage (async storage on mobile)
	 *
	 * the properties of this object are the keys of observable values to watch
	 * the value is the initial value to save if there is no entry in the storage
	 *
	 * @type {{[string]:any}}
	 */
	save = {}

	/**
	 * PROPS TO BE SYNC'D WITH SESSION STORAGE AND THEIR INITIAL VALUES
	 *
	 * Override this object to mark properties that should be synced with
	 * session storage (async storage on mobile)
	 *
	 * the properties of this object are the keys of observable values to watch
	 * the value is the initial value to save if there is no entry in the storage
	 *
	 * @type {{[string]:any}}
	 */
	session = {}

	/**
	 * is set to true once the initial state is restored from async / local storage
	 * @type {boolean}
	 */
	initialStateRestored = false

	/**
	 * these are not really used right now as the state classes
	 * persist during the lifecycle of the page or app session
	 * and there is no formal garbage collection.
	 *
	 * however, in practice one should save a reaction's
	 * destructor in case we need it
	 */
	reactionDisposers = {}

	/**
	 * creates reactions that will save the value of an observable
	 * if declared in the save or session properties
	 *
	 * Saving will begin only after initial values are restored
	 */
	register() {
		Object.keys(this.save).forEach((key) => {
			this.reactionDisposers[key] = reaction(
				() => this[key],
				async () => {
					if (this.initialStateRestored) {
						return this.saveToStorage(platformLocalStorage, key)
					}
				}
			)
		})

		Object.keys(this.session).forEach((key) => {
			this.reactionDisposers[key] = reaction(
				() => this[key],
				async () => {
					if (this.initialStateRestored) {
						return this.saveToStorage(platformSessionStorage, key)
					}
				}
			)
		})
	}

	/**
	 * private function called by the BaseState's init function.
	 *
	 * @return {Promise<void>}
	 */
	async restoreInitialState() {
		let promises = Object.keys(this.save).map((key) => {
			this.loadFromStorage(platformLocalStorage, key, this.save[key])
		})
		promises.concat(
			Object.keys(this.session).map((key) => {
				this.loadFromStorage(platformSessionStorage, key, this.session[key])
			})
		)
		await Promise.all(promises)
		this.initialStateRestored = true
	}

	/**
	 * a private function which loads values from storage.
	 * @param storagePlatform {platformLocalStorage | platformSessionStorage}
	 * @param key {string} the prop to load value from storage
	 * @param initialValue  {*} the initial value to set if no value has been saved
	 * @return {Promise<void>} AsyncStorage or localStorage are wrapped as always being async
	 */
	async loadFromStorage(storagePlatform: AsyncStorage, key, initialValue) {
		try {
			let value = await storagePlatform.getItem(
				this.constructor.name + "_" + key
			)
			console.log(`${value} which is a type of ${typeof value}`)
			/**
			 * a null value indicates that there was no key in storage
			 * so we must create one by immediately saving the value after
			 * we set the initial value
			 */
			if (value === null || value === undefined) {
				console.log(`${this.constructor.name}.${key} not yet in storage.`)
				this[key] = initialValue
				await this.saveToStorage(storagePlatform, key, initialValue)
				return
			}
			console.log(
				`${this.constructor.name}.${key} successfully loaded from storage. value is ${value}`
			)
			this[key] = JSON.parse(value)
		} catch (e) {
			/**
			 * if there is an error, then set initialValue anyway but log the error
			 */
			console.error(
				`error getting ${this.constructor.name}.${key} from storage.`
			)
			console.error(e)
			this[key] = initialValue
			await this.saveToStorage(storagePlatform, key)
		}
	}

	/**
	 * private function that saves the current value of a prop
	 *
	 * values are observables converted to JS and then encoded as JSON
	 *
	 * @param storagePlatform
	 * @param key
	 * @return {Promise<void>}
	 */
	async saveToStorage(storagePlatform: AsyncStorage, key) {
		let jsonValue = JSON.stringify(toJS(this[key]))
		try {
			await storagePlatform.setItem(
				this.constructor.name + "_" + key,
				jsonValue
			)
			console.log(
				`saved ${this.constructor.name}.${key} to storage with a value of ${jsonValue}`
			)
		} catch (e) {
			console.error(
				`error saving ${this.constructor.name}.${key} to storage with a value of ${jsonValue}`
			)
			console.error(e)
		}
	}

	/**
	 * override this method for initializing data from the API
	 * @return {Promise<void>}
	 */
	@action
	async init(...args) {
		console.log(this.save)
		console.log(this.session)
		this.register()
		await this.restoreInitialState()
	}
}

const platformSessionStorage =
	Platform.OS === "web" ? window.sessionStorage : AsyncStorage
const platformLocalStorage =
	Platform.OS === "web" ? window.localStorage : AsyncStorage

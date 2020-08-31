import {
	observable,
	action,
	computed,
	when,
	flow as asyncAction,
	toJS,
	runInAction,
} from "mobx"
import BaseState from "../BaseState"
import BaseModel from "../BaseModel"
import * as EntitiesAPI from "../../../api/entities"
import CRUD from "../../../api/entities"

/**
 * refactor from Maxime's createCrudObservable
 * @param EntityApi
 * @param idField
 * @return {CrudApiObservable}
 */
export function createCrudObservable(EntityApi, idField = "id") {
	class CrudApiObservable {
		@observable id
		@observable data
		@observable state
		@observable error

		constructor(id, initData = null, initState = null) {
			this.init(id, initData, initState)
		}

		@action init(id, initData, initState) {
			this.id = id
			this.data = initData || {}
			this.state = initState || (id ? "undefined" : "new")
			this.error = null
		}

		@computed get isNew() {
			return this.state === "new" && !this.id
		}

		@computed get canSave() {
			return this.isNew || (this.state === "ready" && this.id)
		}

		async save() {
			if (this.isNew) {
				return await this.create()
			} else if (this.canSave) {
				return await this.update()
			} else {
				// TODO: should await an actual update events if it's currently creating/updati
				throw new Error(
					"This API entity is in an invalid state and cannot be saved."
				)
			}
		}
	}
	function genMethod(method, loadingState, finishedState, callApi) {
		CrudApiObservable.prototype[method] = asyncAction(function* (...args) {
			this.state = loadingState
			this.error = null

			try {
				const result_data = yield callApi.call(this, ...args)
				this.state = finishedState
				this.data = { ...toJS(this.data), ...result_data }
				this.id = result_data[idField] || this.data[idField] || this.id
				return result_data
			} catch (error) {
				if (this.state === loadingState) {
					this.error = error
					this.state = "error"
				}
				throw error
			}
		})
	}
	genMethod("create", "creating", "ready", async function (...args) {
		return await EntityApi.create(...args)
	})

	genMethod("read", "loading", "ready", async function (...args) {
		return await EntityApi.read(this.id, ...args)
	})

	genMethod("replace", "updating", "ready", async function (...args) {
		return await EntityApi.replace(this.id, ...args)
	})

	genMethod("update", "updating", "ready", async function (...args) {
		return await EntityApi.update(this.id, ...args)
	})

	genMethod("destroy", "destroying", "destroyed", async function (...args) {
		return await EntityApi.destroy(this.id, ...args)
	})

	return CrudApiObservable
}

/**
 * refactor from Maxime's createEntityListObservable
 * @param Entity
 * @param idField
 * @return {{new(*): {list: {}, get(*=, *=): *, fetch(*=, *=): *, create(*=): *, addToList(*): void, root, init(...[*]): Promise<void>}, prototype: {list: {}, get(*=, *=): *, fetch(*=, *=): *, create(*=): *, addToList(*): void, root, init(...[*]): Promise<void>}}}
 */
export function createEntityListObservable(Entity, idField = "id") {
	return class extends BaseState {
		@observable list = {}
		@action get(id, initData = null) {
			if (!this.list[id]) {
				this.list[id] = new Entity(id, initData)
				//this.notify("add", [this[id]])
			}
			return this.list[id]
		}

		@action fetch(id, initData) {
			if (!this.list[id]) {
				this.list[id] = new Entity(id, initData)
				this.list[id].read()
			}

			return this.list[id]
		}

		@action create(initData = {}) {
			const model = new Entity(null, initData)
			when(
				() => model.id,
				(id) => {
					if (this.list[id] && this.list[id] !== model) {
						console.error(
							"There are two model instances with the same ID! Going to throw an error...",
							model,
							this[model.id]
						)

						throw new Error(
							"Model just received an ID that already exists: " + model.id
						)
					}
					this.addToList(model)
				}
			)
			return model
		}
		@action addToList(model) {
			this.list[model.id] = model
		}
	}
}
/**
 * a new entity list manager that uses view models for editing
 *
 * Wheras other UI forms use forms in components seem to manage a lot of things in their code, this structure
 * allows for a state that has a list, but uses an integrated view model so that the UI to add or edit an entry
 * requires no logic in the component at all. Each view model contains fields which are defined explicitly
 * so that the components which manage forms do not need to do any logic, this properly separates the UI from the internals of the model
 *
 * @param type {string} the type of entity
 * @param modelClass {BaseModel} a model class used to as a view model
 */
export function createEntityListState(type: string, modelClass: BaseModel) {
	return class extends BaseState {
		modelClass: BaseModel = modelClass
		@observable type = type
		@observable error = null
		@observable isLoading = null
		@observable list = {}
		@observable model: BaseModel = null
		@computed get editing() {
			return this.model !== null
		}

		@action clearList() {
			this.list = {}
			this.error = null
			this.isLoading = null
		}
		@action async init() {
			//await this.load()
			return true
		}
		@action async load() {
			this.isLoading = true
			try {
				const response = await EntitiesAPI.listEntities(this.type)
				response.data.forEach(
					action((datum) => {
						this.list[datum.entity_id] = datum
					})
				)
				runInAction(() => {
					this.isLoading = false
					this.error = null
				})
			} catch (error) {
				runInAction(() => {
					this.error = error.data ? error.data : error
					this.isLoading = false
				})
			}
		}

		@action async new() {
			this.model = new this.modelClass()
			this.model.init()
		}

		@action edit(id) {
			if (!this.list[id]) {
				throw Error("trying to edit an entity which does not exist")
			}
			this.model = new this.modelClass()
			this.model.init(this.list[id])
		}

		@action cancelEdit() {
			this.model = null
		}

		@action async save(): boolean {
			this.isLoading = true
			let isValid = await this.model.validate()
			if (isValid) {
				try {
					await this.model.save()
					runInAction(() => {
						this.list[this.model["entity_id"].value] = this.model.exportData()
						this.isLoading = false
						this.model = null
					})
					return true
				} catch (e) {
					this.error = e
					this.isLoading = false
					return false
				}
			} else {
				return false
			}
		}

		@action async delete(id) {
			this.isLoading = true
			try {
				await CRUD.destroy(id)
				await this.load()
			} catch (e) {
				runInAction(() => {
					this.error = e.message
					this.isLoading = false
				})
			}
		}
	}
}

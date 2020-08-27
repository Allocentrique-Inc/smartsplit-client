import {
	observable,
	action,
	computed,
	when,
	flow as asyncAction,
	toJS,
} from "mobx"
import BaseState from "../BaseState"
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

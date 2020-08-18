import { Observable } from "../store"

export function createCrudObservable(EntityApi, idField = "id") {
	class CrudApiObservable extends Observable {
		constructor(id, initData = null, initState = null) {
			super()

			this.id = id
			this.data = initData || {}
			this.state = initState || (id ? "undefined" : "new")
			this.error = null
		}

		get isNew() {
			return this.state === "new" && !this.id
		}

		get canSave() {
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

	/**
	 * Creates a new wrapped method on the generated Observable class that automatically catches errors and does the appropriate state transitions as well as merging new data received from the API.
	 */
	function genMethod(method, loadingState, finishedState, callApi) {
		CrudApiObservable.prototype[method] = async function (...args) {
			this.set({ state: loadingState, error: null })

			try {
				const result_data = await callApi.call(this, ...args)

				this.set({
					state: finishedState,
					data: { ...this.data, ...result_data },
					id: result_data[idField] || this.data[idField] || this.id,
				})

				return result_data
			} catch (error) {
				if (this.state === loadingState) {
					this.set({ state: "error", error })
				}

				throw error
			}
		}
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
	return class extends Observable {
		constructor() {
			super()
		}

		get(id, initData = null) {
			if (!this[id]) {
				this[id] = new Entity(id, initData)
				this.notify("add", [this[id]])
			}

			return this[id]
		}

		fetch(id, initData) {
			if (!this[id]) {
				this[id] = new Entity(id, initData)
				this[id].read()
				this.notify("add", [this[id]])
			}

			return this[id]
		}

		create(initData = {}) {
			const model = new Entity(null, initData)
			const unsubscribe = model.subscribe(() => {
				if (!model.id) return

				if (this[model.id] && this[model.id] !== model) {
					console.error(
						"There are two model instances with the same ID! Going to throw an error...",
						model,
						this[model.id]
					)

					throw new Error(
						"Model just received an ID that already exists: " + model.id
					)
				}

				this[model.id] = model
				this.notify("add", [model])
				unsubscribe()
			})

			return model
		}
	}
}

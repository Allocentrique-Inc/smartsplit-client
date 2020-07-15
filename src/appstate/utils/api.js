import { Observable } from "../store"

export function createCrudObservable(EntityApi) {
	class CrudApiObservable extends Observable {
		constructor(id, initData = null) {
			super()

			this.id = id
			this.data = initData || {}
			this.state = id ? "undefined" : "new"
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

	function genMethod(method, loadingState, finishedState) {
		CrudApiObservable.prototype[method] = async function (...args) {
			this.set({ state: loadingState, error: null })

			try {
				const result = await EntityApi[method](this.id, ...args)
				this.set({
					state: finishedState,
					data: result.data,
					id: result.data.workpiece_id || this.data.workpiece_id || this.id,
				})
				return result
			} catch (error) {
				this.set({ state: "error", error })
				throw error
			}
		}
	}

	genMethod("create", "creating", "ready")
	genMethod("read", "loading", "ready")
	genMethod("replace", "updating", "ready")
	genMethod("update", "updating", "ready")
	genMethod("destroy", "destroying", "destroyed")

	return CrudApiObservable
}

export function createEntityListObservable(Entity) {
	return class extends Observable {
		constructor() {
			super()
		}

		get(id, initData = null) {
			if (!this[id]) {
				this[id] = new Entity(id, initData)
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
				unsubscribe()
			})

			return model
		}
	}
}

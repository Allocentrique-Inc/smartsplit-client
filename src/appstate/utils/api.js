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
	}

	function genMethod(method, loadingState, finishedState) {
		CrudApiObservable.prototype[method] = async function (...args) {
			this.set({ state: loadingState, error: null })

			try {
				const result = await EntityApi[method](this.id, ...args)
				this.set({ state: finishedState, data: result.data })
				return result
			} catch (error) {
				this.set({ state: "error", error })
				throw error
			}
		}
	}

	// prettier-ignore
	genMethod("create",  "creating",   "ready")
	genMethod("read", "loading", "ready")
	genMethod("replace", "updating", "ready")
	genMethod("update", "updating", "ready")
	genMethod("destroy", "destroying", "destroyed")

	return CrudApiObservable
}

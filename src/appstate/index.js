import { Store } from "./store"
import { StoreProvider, injectReactHooks } from "./react"

import * as models from "./models"

export function createAppStore() {
	const store = new Store(injectReactHooks)
	Object.assign(store, store.bindClasses(models))

	store.auth = new store.Authentication()
	store.users = new store.UserList()
	store.test = new store.Test()

	return store
}

export { StoreProvider }

import { Store } from "./store"
import { StoreProvider, injectReactHooks } from "./react"

import { User, UserList } from "./models/users"
import Test from "./models/test"

export function createAppStore() {
	const store = new Store(injectReactHooks)
	Object.assign(store, store.bindClasses({ User, UserList, Test }))

	store.users = new store.UserList()
	store.test = new store.Test()

	return store
}

export { StoreProvider }

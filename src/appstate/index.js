import { StoreProvider } from "./react"

import {
	Authentication,
	UserList,
	RightHolders,
	WorkpieceList,
	Test,
} from "./models"

export function createAppStore() {
	const users = new UserList()
	const auth = new Authentication(users)

	const rightHolders = new RightHolders(users)
	const workpieces = new WorkpieceList()

	const test = new Test()

	return Object.freeze({
		auth,
		users,
		rightHolders,
		workpieces,
		test,
	})
}

export { StoreProvider }

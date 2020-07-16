import { StoreProvider } from "./react"

import { Authentication, UserList, WorkpieceList, Test } from "./models"

export function createAppStore() {
	const users = new UserList()
	const auth = new Authentication(users)

	const workpieces = new WorkpieceList()

	const test = new Test()

	return Object.freeze({
		auth,
		users,
		workpieces,
		test,
	})
}

export { StoreProvider }

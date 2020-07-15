import { Observable } from "../store"
import { createCrudObservable, createEntityListObservable } from "../utils/api"
import UsersCrudAPI from "../../../api/users"

const UserObservable = createCrudObservable(UsersCrudAPI)

export class User extends UserObservable {
	constructor(id, initData = null) {
		super(id, initData)
	}

	setData(data) {
		this.set({ data })
	}
}

const UserListObservable = createEntityListObservable(User, "User")

export class UserList extends UserListObservable {}

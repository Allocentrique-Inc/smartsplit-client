import { Observable } from "../store"
import { createCrudObservable, createEntityListObservable } from "../utils/api"
import UsersCrudAPI from "../../../api/users"

const UserObservable = createCrudObservable(UsersCrudAPI, "user_id")

export class User extends UserObservable {
	constructor(id, initData = null, initState = null) {
		super(id, initData, (initState = null))
	}

	setData(data) {
		this.set({ data })
	}
}

const UserListObservable = createEntityListObservable(User, "user_id")

export class UserList extends UserListObservable {}

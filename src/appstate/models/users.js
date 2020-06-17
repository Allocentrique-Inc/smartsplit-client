import { Observable } from "../store"
import { createCrudObservable } from "../utils/api"
import UsersCrudAPI from "../../../api/users"

export class UserList extends Observable {
	constructor() {
		super()
	}

	get(id, initData = null) {
		if (!this[id]) {
			this[id] = new this.store.User(id, initData)
		}

		return this[id]
	}

	create(initData = {}) {
		const model = new this.store.User(null, initData)
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

const UserObservable = createCrudObservable(UsersCrudAPI)

export class User extends UserObservable {
	constructor(id, initData = null) {
		super(id, initData)
	}

	setData(data) {
		this.set({ data })
	}
}

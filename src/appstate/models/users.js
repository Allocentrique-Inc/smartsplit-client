import { Observable } from "../store"

export class UserList extends Observable {
	constructor() {
		super()
	}
}

export class User extends Observable {
	constructor() {
		super()
		this.id = 1
	}

	test() {
		this.id += 1
		this.notify()
	}
}

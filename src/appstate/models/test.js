import { Observable } from "../store"

export class Test extends Observable {
	constructor() {
		super()
		this.value = 0
	}

	increment = () => {
		this.value++
		this.notify("incremented")
	}
}

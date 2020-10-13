import { observable, action, computed } from "mobx"
import BaseState from "../BaseState"

export default class TestCountState extends BaseState {
	@observable
	count = 0

	@computed
	get squared() {
		return this.count * this.count
	}

	@action.bound
	increment() {
		this.count++
	}

	@action
	decrement = () => {
		this.count--
	}
}

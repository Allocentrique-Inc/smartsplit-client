import { observable, action, computed } from "mobx"
import BaseState from "../BaseState"

export default class BlaState extends BaseState {
	@observable
	count = 0

	@action.bound
	increment() {
		this.count++
	}

	@action
	decrement = () => {
		this.count--
	}

	@computed
	get squared() {
		return this.count * this.count
	}
}

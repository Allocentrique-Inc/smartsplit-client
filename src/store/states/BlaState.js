import { observable, action, computed } from "mobx"
import BaseState from "../BaseState"

export default class BlaState extends BaseState {
	@observable
	count = 0

	@action
	increment() {
		this.count++
	}

	@action
	decrement() {
		this.count--
	}

	@computed
	get squared() {
		return this.count * this.count
	}
}

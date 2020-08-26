import { observable, action, computed, flow as asyncAction } from "mobx"
import BaseState from "../BaseState"

export default class TestState extends BaseState {
	@observable
	stuff = ["one", "two", "three", ["four", "is", "an", "array"]]

	@observable
	deep = {
		level1: {
			leaf: "leaf1",
			level2: {
				leaf: "leaf2",
			},
		},
	}

	@observable
	now = new Date()

	@action addStuff() {
		this.stuff.push("stuff")
	}

	@action makeYesterday() {
		this.now = new Date(new Date().getTime() - 8640000)
	}
}

import { observable, action, computed, flow as asyncAction } from "mobx"

export default class BaseState {
	@action
	loadState() {}

	@action
	saveState() {}
}

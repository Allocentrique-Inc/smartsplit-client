import {
	observable,
	reaction,
	action,
	flow as asyncAction,
	runInAction,
} from "mobx"
import BaseState from "../BaseState"
import ContributorModel from "../models/user/ContributorModel"

export default class ContributorsState extends BaseState {
	@observable list = []
	@observable model = new ContributorModel()
	async init(...args) {
		this.model.init()
		reaction(
			() => this.root.users.user_id,
			() => {
				this.load()
			},
			{ fireImmediately: true }
		)
	}
	@action async load() {
		this.loading = true
		console.log("user_id changed")
		// await api call to load and
		runInAction(() => {
			// set list
			this.loading = false
		})
	}
}

import { observable, reaction, action, runInAction } from "mobx"
import BaseState from "../BaseState"
import CollaboratorModel from "../models/user/CollaboratorModel"

export default class CollaboratorsState extends BaseState {
	@observable list = []
	@observable model = new CollaboratorModel()
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

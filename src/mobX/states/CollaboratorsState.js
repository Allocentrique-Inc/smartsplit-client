import { observable, reaction, action, runInAction, toJS } from "mobx"
import BaseState, { save } from "../BaseState"
import CollaboratorModel from "../models/user/CollaboratorModel"

export default class CollaboratorsState extends BaseState {
	@save({ storeName: "Collaborators" })
	@observable
	list = []

	@observable editing = false
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
		// console.log("user_id changed")
		// await api call to load and
		runInAction(() => {
			// set list
			this.loading = false
		})
	}
	@action new() {
		this.model = new CollaboratorModel()
		this.model.init()
		this.editing = true
	}
	@action cancel() {
		this.editing = false
	}

	@action async submit() {
		this.duplicate = null
		await this.model.validate()
		if (this.model.isValid) {
			let collab = await this.model.submit()
			if (collab) this.add(collab.user_id, collab)
			//await this.root.users.fetch(collab.user_id)
			return collab
		}
		return false
	}
	@action add(key, person) {
		this.editing = false
		this.list = { ...toJS(this.list), [key]: person }
	}
}

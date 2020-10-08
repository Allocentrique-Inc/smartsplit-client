import { observable, reaction, action, runInAction, toJS } from "mobx"
import BaseState, { save } from "../../BaseState"
import { addEmail, getEmails } from "../../../../api/enails"
import EmailModel from "../../models/settings/EmailModel"
export default class EmailState extends BaseState {
	@observable
	list = []

	@observable adding = false
	@observable added = false
	@observable model: EmailModel = new EmailModel(null, [])
	async init(...args) {
		//this.model.init()
		reaction(
			() => this.root.auth.user_id,
			(userId) => {
				this.load(userId)
			},
			{ fireImmediately: true }
		)
	}
	@action new() {
		//console.log("new email dialog")
		this.adding = true
		this.model = new EmailModel(null, this.list)
		this.model.init()
	}
	@action cancel() {
		this.adding = false
		this.added = false
		this.model.reset()
	}
	@action complete() {
		this.cancel()
	}
	@action async submit() {
		await this.model.validate()
		if (this.model.isValid) {
			try {
				let response = await addEmail(this.root.auth.user_id, this.model.toJS())
				//console.log(response)
			} catch (e) {
				//console.log(e)
			}
		}
	}
	@action async load(userId) {
		if (!userId) return
		this.loading = true
		//console.log("EmailState user_id changed")
		try {
			let list = await getEmails(userId)
			runInAction(() => {
				this.list = list.data
				this.model = new EmailModel(null, this.list)
				this.loading = false
			})
		} catch (e) {
			//console.log(e)
			runInAction(() => {
				this.loading = false
			})
		}
	}
}

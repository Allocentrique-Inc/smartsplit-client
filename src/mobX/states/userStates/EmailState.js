import { observable, reaction, action, runInAction, toJS } from "mobx"
import BaseState, { save } from "../../BaseState"
import { getEmails } from "../../../../api/enails"
export default class EmailState extends BaseState {
	@observable
	list = []

	@observable editing = false
	@observable model
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
	@action async load(userId) {
		if (!userId) return
		this.loading = true
		//	console.log("EmailState user_id changed")
		try {
			let list = await getEmails(userId)
			runInAction(() => {
				this.list = list.data
				this.loading = false
			})
		} catch (e) {
			console.log(e)
			runInAction(() => {
				this.loading = false
			})
		}
	}
}

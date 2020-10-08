import {
	observable,
	reaction,
	action,
	flow as asyncAction,
	runInAction,
	toJS,
} from "mobx"
import BaseState, { save } from "../BaseState"
import ContributorModel from "../models/user/ContributorModel"
import UUID from "uuidjs"
/**
 * this state class manages the contributor's list
 *
 * Notes sept 18, 2020:
 * -----------------------------------------------
 *  - the API has not been developed yet and
 *    therefore contributors for now are saved
 *    in local storage for the web
 *
 */
export default class ContributorsState extends BaseState {
	@save({ storeName: "Contributors" })
	@observable
	list = {}

	@observable editing = false
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
	@action new() {
		this.model = new ContributorModel()
		this.model.init()
		this.editing = true
	}
	@action cancel() {
		this.editing = false
	}
	@action async load() {
		this.loading = true
		//console.log("user_id changed")
		// await api call to load and
		runInAction(() => {
			// set list
			this.loading = false
		})
	}
	@observable duplicate = null
	@action async submit() {
		this.duplicate = null
		await this.model.validate()
		if (this.model.isValid) {
			let id = this.model.id.value || UUID.generate()
			let friend = {
				...this.model.toJS(),
				name: this.model.firstName.value + " " + this.model.lastName.value,
				id: id,
			}
			if (this.list[id]) {
				// if the key of this contributor exists, it suggests
				// that the user has already added the contributor.
				// In this case we set the duplicate so the UI knows
				// to offer us this selection, rather than displaying an error
				runInAction(() => {
					this.duplicate = friend
					this.editing = false
				})
			} else this.add(id, friend)
			return friend
		}
	}
	@action add(key, person) {
		this.editing = false
		this.list = { ...toJS(this.list), [key]: person }
	}
}

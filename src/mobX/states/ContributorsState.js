import {
	observable,
	reaction,
	action,
	flow as asyncAction,
	runInAction,
} from "mobx"
import BaseState, { save } from "../BaseState"
import ContributorModel from "../models/user/ContributorModel"

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
	@save @observable list = {}
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
	@observable duplicate = null
	@action async submit() {
		this.duplicate = null
		await this.model.validate()
		if (this.model.isValid) {
			let key = this.model.firstName.value + "_" + this.model.lastName.value
			let friend = {
				...this.model.toJS(),
				name: this.model.firstName.value + " " + this.model.lastName.value,
				key: key,
			}
			if (this.list[key]) {
				// if the key of this contributor exists, it suggests
				// that the user has already added the contributor.
				// In this case we set the duplicate so the UI knows
				// to offer us this selection, rather than displaying an error
				runInAction(() => {
					this.duplicate = friend
				})
			} else this.add(key, friend)
			return friend
		}
	}
	@action add(key, person) {
		this.list[key] = person
	}
}

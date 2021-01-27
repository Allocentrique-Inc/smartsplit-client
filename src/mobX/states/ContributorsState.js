import { observable, reaction, action, runInAction, toJS } from "mobx"
import BaseState, { save } from "../BaseState"
import ContributorModel from "../models/user/ContributorModel"
import ContributorsApi from "../../../api/contributors"
import CollaboratorsApi from "../../../api/collaborators"
import CollaboratorModel from "../models/user/CollaboratorModel"
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
	modelType = ContributorModel
	apiType = ContributorsApi
	type = "contributor"
	api
	@observable
	list = []

	@observable adding = false
	@observable editing = false
	@observable model = new ContributorModel()
	constructor(root) {
		super(root)
	}
	async init(...args) {
		this.model.init()
		reaction(
			() => this.root.auth.user_id,
			() => {
				if (this.root.auth.user_id) {
					this.api = new this.apiType(this.root.auth.user_id)
					return this.load()
				}
			},
			{ fireImmediately: true }
		)
	}
	@action new() {
		this.model = new this.modelType()
		this.model.init()
		this.adding = true
	}
	@action cancel() {
		this.adding = false
	}
	async load() {
		this.loading = true
		try {
			const list = await this.api.list()
			runInAction(() => {
				this.list = list
			})
		} catch (e) {
		//	console.log(e)
		}
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
			try {
				const contributor = await this.api.create(this.model.toJS())
				await this.load()
				return contributor
			} catch (e) {
				console.error(e)
			}
		} else {
		//	console.log(`${this.type} model is not valid`)
			/*this.model
				.fields()
				.map((f) => console.log(`${f} : ${this.model[f].isValid}`))*/
		}
	}
	@action add(key, person) {
		this.editing = false
		this.list = { ...toJS(this.list), [key]: person }
	}
}

import { createCrudObservable, createEntityListObservable } from "../crud"
import WorkpiecesCrudAPI, {
	getDocumentation,
	listForUser,
} from "../../../api/workpieces"
import {
	action,
	computed,
	decorate,
	observable,
	reaction,
	runInAction,
	toJS,
} from "mobx"
import DocumentationModel from "../models/workpieces/documentation/DocumentationModel"
import RightSplitsModel from "../models/workpieces/right-splits/RightSplitsModel"
import WorkpieceModel from "../models/workpieces/WorkpieceModel"

const WorkpieceObservable = createCrudObservable(
	WorkpiecesCrudAPI,
	"workpiece_id"
)

export const $workpiece = Symbol("Workpiece")

export class Workpiece extends WorkpieceObservable {
	/**
	 * the documentation model
	 */
	@observable documentation: DocumentationModel
	constructor(id, initData = null, initState) {
		const { files, rightSplit, ...data } = initData || {}
		super(id, data, initState)
		this.rightSplits = new RightSplitsModel(null, this)

		// initialising the documentation by passing the workpiece for id, etc
		this.documentation = new DocumentationModel(
			null,
			this /*, documentation data extracted from data */
		)
		getDocumentation(id).then((docs) => {
			this.documentation.init(docs.data)
		})
		//this.documentation.init()
		//console.log(toJS(this.documentation))
		//console.log(this.documentation.toJS())
	}

	/**
	 * the right splits data observable wich contains model for various sections of the rights dividing pages
	 */
	@observable rightSplits

	/**
	 * the documentation observable which contains models for the various sections
	 * of the workpiece documentation section
	 */
	@observable documentation

	set(props) {
		if (props.data) {
			const { rightSplit } = props.data
			if (rightSplit) {
				this.rightSplits._updateRightsSplits(rightSplit)
			}
		}
	}

	setData(data) {
		this.set({ data: { ...this.data, ...data } })
	}
}

const WorkpieceListObservable = createEntityListObservable(
	Workpiece,
	"workpiece_id"
)

export default class WorkpieceState extends WorkpieceListObservable {
	@observable error = null
	@observable isLoading = false
	@observable model = new WorkpieceModel()
	@action async submit() {
		await this.model.validate()
		if (this.model.isValid) {
			try {
				let workpiece = this.model.submit()
				await this.fetchWorkpieceList(this.root.auth.user_id)
				return workpiece
			} catch (e) {
				console.log(e)
				//	return false;
			}
		}
		return false
	}

	/**
	 * init workpieces
	 *
	 * we use a reaction in init that will fire immediately.
	 * and will also fire anytime the user id changes
	 * which normallu only happens when there is a login event
	 *
	 * @return {Promise<void>}
	 */
	async init() {
		//console.log(userId)
		this.model.init()
		reaction(
			() => this.root.auth.user_id,
			(userId) => {
				this.fetchWorkpieceList(userId)
			},
			{ fireImmediately: true }
		)
	}

	//Method overwrites current list atm
	@action
	async fetchWorkpieceList(userId) {
		if (!userId) return
		this.isLoading = true
		this.error = null
		try {
			const workpieces = await listForUser(userId)
			workpieces.forEach((wp) => {
				this.addToList(new Workpiece(wp.workpiece_id, wp, "ready"))
			})
			runInAction(() => {
				this.isLoading = false
			})
		} catch (e) {
			console.error("Error while fetching workpiece list:", e)
			runInAction(() => {
				this.isLoading = false
				this.error = e
			})
		}
	}

	get all() {
		return Object.values(this.list)
	}
}

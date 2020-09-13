import { createCrudObservable, createEntityListObservable } from "../crud"
import WorkpiecesCrudAPI, { listForUser } from "../../../api/workpieces"
import { action, computed, decorate, observable } from "mobx"
import Documentation from "./workpieceStates/Documentation"
import RightsSplits from "./workpieceStates/RightSplits"

const WorkpieceObservable = createCrudObservable(
	WorkpiecesCrudAPI,
	"workpiece_id"
)

export const $workpiece = Symbol("Workpiece")

export class Workpiece extends WorkpieceObservable {
	constructor(id, initData = null, initState) {
		const { files, rightSplit, ...data } = initData || {}
		super(id, data, initState)
		this.rightsSplits = new RightsSplits(this, rightSplit)
		this.documentation = new Documentation(
			this /*, documentation data extracted from data */
		)
	}

	/**
	 * the rights splits data observable  used for the rights dividing section
	 */
	@observable rightsSplits

	/**
	 * the documentation observable which contains models for the various sections
	 * of the workpiece documentation section
	 */
	@observable documentation

	set(props) {
		if (props.data) {
			const { rightSplit } = props.data
			if (rightSplit) {
				this.rightsSplits._updateRightsSplits(rightSplit)
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

	async init(userId) {
		this.isLoading = true
		userId && (await this.fetchWorkpieceList(userId))
		this.isLoading = false
	}

	//Method overwrites current list atm
	@action
	async fetchWorkpieceList(userId) {
		this.isLoading = true
		this.error = null
		try {
			const workpieces = await listForUser(userId)
			workpieces.forEach((wp) => {
				this.addToList(new Workpiece(wp.workpiece_id, wp, "ready"))
			})
			this.isLoading = false
		} catch (e) {
			console.error("Error while fetching workpiece list:", e)
			this.isLoading = false
			this.error = e
		}
	}

	get all() {
		return Object.values(this.list)
	}
}

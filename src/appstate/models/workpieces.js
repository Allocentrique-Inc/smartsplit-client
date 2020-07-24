import { Observable } from "../store"
import { createCrudObservable, createEntityListObservable } from "../utils/api"
import WorkpiecesCrudAPI, { listForUser } from "../../../api/workpieces"

const WorkpieceObservable = createCrudObservable(
	WorkpiecesCrudAPI,
	"workpiece_id"
)

export class Workpiece extends WorkpieceObservable {
	constructor(id, initData = null, initState) {
		super(id, initData, initState)
	}

	setData(data) {
		this.set({ data })
	}
}

const ListObservable = createEntityListObservable(Workpiece, "workpiece_id")

export class WorkpieceList extends ListObservable {
	constructor() {
		super()
	}

	async fetchForUser(user) {
		const workpieces = await listForUser(user.id)

		this.notify(
			"add",
			workpieces.map((wp) => {
				this[wp.workpiece_id] = wp = new Workpiece(wp.workpiece_id, wp, "ready")
				return wp
			})
		)
	}

	ownedByUser(user) {
		// TODO: filter
		return Object.values(this).sort((a, b) =>
			(a.data.title || "").localeCompare(b.data.title || "")
		)
	}
}

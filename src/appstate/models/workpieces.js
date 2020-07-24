import { Observable } from "../store"
import { createCrudObservable, createEntityListObservable } from "../utils/api"
import WorkpiecesCrudAPI from "../../../api/workpieces"

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

export class WorkpieceList extends ListObservable {}

import { Observable } from "../store"
import { createCrudObservable, createEntityListObservable } from "../utils/api"
import WorkpiecesCrudAPI from "../../../api/workpieces"

const WorkpieceObservable = createCrudObservable(WorkpiecesCrudAPI)

export class Workpiece extends WorkpieceObservable {
	constructor(id, initData = null) {
		super(id, initData)
	}

	setData(data) {
		this.set({ data })
	}
}

const ListObservable = createEntityListObservable(Workpiece)

export class WorkpieceList extends ListObservable {}

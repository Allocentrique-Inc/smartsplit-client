import { Observable } from "../store"
import { createCrudObservable, createEntityListObservable } from "../utils/api"
import WorkpiecesCrudAPI, {
	listForUser,
	uploadFileToWorkpiece,
} from "../../../api/workpieces"
import { splitDataUri } from "../../utils/uri"

const WorkpieceObservable = createCrudObservable(
	WorkpiecesCrudAPI,
	"workpiece_id"
)

export class Workpiece extends WorkpieceObservable {
	constructor(id, initData = null, initState) {
		const { files, ...data } = initData || {}
		super(id, initData, initState)

		Object.defineProperty(this, "files", {
			enumerable: true,
			configurable: false,
			writable: false,
			value: new WorkpieceFileList(this, files),
		})

		Object.defineProperty(this, "rightsSplits", {
			enumerable: true,
			configurable: false,
			writable: false,
			value: Object.freeze({
				copyright: new CopyrightSplit(),
				interpretation: new InterpretationSplit(),
				recording: new RecordingSplit(),
			}),
		})
	}

	set(props) {
		if (props.data) {
			const { files, ...data } = props.data

			if (files) {
				this.files._updateAll(files)
			}

			props.data = data
		}

		super.set(props)
	}

	setData(data) {
		this.set({ data: { ...this.data, ...data } })
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
				if (wp.workpiece_id in this) {
					this[wp.workpiece_id].setData(wp)
					wp = this[wp.workpiece_id]
				} else {
					this[wp.workpiece_id] = wp = new Workpiece(
						wp.workpiece_id,
						wp,
						"ready"
					)
				}

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

export class WorkpieceFileList extends Observable {
	constructor(workpiece, files) {
		super()

		Object.defineProperty(this, "workpiece", {
			enumerable: false,
			writable: false,
			value: workpiece,
		})

		if (files) {
			this._updateAll(files)
		}
	}

	_updateAll(files) {
		const added = []

		files.forEach((file) => {
			if (file.file_id in this) {
				this[file.file_id].set({ data: file })
			} else {
				const wp = new WorkpieceFile(this.workpiece, file, "ready")
				this[file.file_id] = wp
				added.push(wp)
			}
		})

		if (added.length > 0) {
			this.notify("add", added)
		}
	}

	get $all() {
		return Object.values(this)
	}

	async upload(metadata, file) {
		throw new Error(
			"We haven't needed to implement handling File's yet because we've been using base64 so far"
		)
	}

	async uploadBase64(metadata, base64File) {
		const upload = await uploadFileToWorkpiece(
			this.workpiece.id,
			metadata,
			base64File
		)

		const wpf = new WorkpieceFile(this.workpiece, upload, "ready")
		this[upload.file_id] = wpf
		this.notify("add", [wpf])

		return wpf
	}

	async uploadUri(metadata, fileUri) {
		const { contentType, encodedData } = splitDataUri(fileUri)

		return await this.uploadBase64(
			{
				mimeType: contentType,
				...metadata,
			},
			encodedData
		)
	}
}

export class WorkpieceFile extends Observable {
	constructor(workpiece, initData, initState) {
		super()

		this.data = initData || {}
		this.state = initState || "new"

		Object.defineProperty(this, "workpiece", {
			enumerable: false,
			configurable: false,
			writable: false,
			value: workpiece,
		})
	}

	set(props) {
		Object.assign(this, props)
		this.notify("set", props)
	}
}

export class RightSplit extends Observable {
	constructor(shares) {
		super()
	}

	removeRightHolder(rightHolder_id) {
		if (rightHolder_id in this) {
			const share = this[rightHolder_id]
			delete this[rightHolder_id]
			this.notify("remove", share)
		}
	}

	addRightHolder(rightHolder_id, share = {}) {
		if (rightHolder_id in this) {
			throw new Error("Cannot add share: this user already has a share")
		}

		const newShare = (this[rightHolder_id] = new SplitShare(
			rightHolder_id,
			share
		))
		this.notify("add", newShare)
	}

	addShare(share) {
		return this.addRightHolder(share.rightHolder, share)
	}

	removeShare(share) {
		return this.removeRightHolder(share.rightHolder)
	}

	get allShares() {
		return Object.values(this)
	}
}

export class CopyrightSplit extends RightSplit {}
export class InterpretationSplit extends RightSplit {}
export class RecordingSplit extends RightSplit {}

export class SplitShare extends Observable {
	constructor(rightHolder_id, data) {
		super()

		this.shares = 1
		this.roles = []
		this.comment = ""
		this.vote = "undecided"
		Object.assign(this, data)
		this.rightHolder = rightHolder_id
	}
}

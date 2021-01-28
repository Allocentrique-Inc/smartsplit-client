import { Observable } from "../store"
import { createCrudObservable, createEntityListObservable } from "../utils/api"
import WorkpiecesCrudAPI, {
	listForUser,
	uploadFileToWorkpiece,
	createRightSplits,
	updateRightSplits,
} from "../../../api/workpieces"
import { splitDataUri } from "../../utils/uri"

const WorkpieceObservable = createCrudObservable(
	WorkpiecesCrudAPI,
	"workpiece_id"
)

export const $workpiece = Symbol("Workpiece")
export const $splitsWatch = Symbol("Splits Watch")

export class Workpiece extends WorkpieceObservable {
	constructor(id, initData = null, initState) {
		const { files, rightSplit, ...data } = initData || {}
		// NOTE: Server calls it rightSplit, but it's the splitS of multiple rightS so it's called rightsSplits.
		super(id, data, initState)

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
			value: new RightsSplits(this, rightSplit),
		})
	}

	set(props) {
		if (props.data) {
			const { files, rightSplit, ...data } = props.data

			if (files) {
				this.files._updateAll(files)
			}

			if (rightSplit) {
				this.rightsSplits._updateRightsSplits(rightSplit)
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

		this[$workpiece] = workpiece

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
				const wp = new WorkpieceFile(this[$workpiece], file, "ready")
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
			this[$workpiece].id,
			metadata,
			base64File
		)

		const wpf = new WorkpieceFile(this[$workpiece], upload, "ready")
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

export class RightsSplits extends Observable {
	constructor(workpiece, rightsSplits = {}) {
		super()

		this[$workpiece] = workpiece

		Object.defineProperties(this, {
			copyright: {
				configurable: false,
				enumerable: true,
				writable: false,
				value: new CopyrightSplit(rightsSplits.copyright),
			},
			interpretation: {
				configurable: false,
				enumerable: true,
				writable: false,
				value: new InterpretationSplit(rightsSplits.interpretation),
			},
			recording: {
				configurable: false,
				enumerable: true,
				writable: false,
				value: new RecordingSplit(rightsSplits.recording),
			},

			_state: {
				configurable: false,
				enumerable: false,
				writable: true,
				value: rightsSplits._state,
			},

			$hasChanged: {
				configurable: false,
				enumerable: false,
				writable: true,
				value: false,
			},

			$error: {
				configurable: false,
				enumerable: false,
				writable: true,
				value: null,
			},
		})

		const setChanged = () => this.set({ $hasChanged: true })

		this.copyright.subscribe(setChanged)
		this.interpretation.subscribe(setChanged)
		this.recording.subscribe(setChanged)
	}

	_updateRightsSplits(rightsSplits) {
		const { _state, ...splits } = rightsSplits

		for (let type in splits) {
			if (type in this && this[type].updateShares) {
				this[type].updateShares(splits[type])
			}
		}

		this.set({ _state, $hasChanged: false })
	}

	_exportRightsSplits() {
		const output = {}

		for (let type in this) {
			output[type] = this[type].allShares
		}

		return output
	}

	async save() {
		if (!this.$hasChanged) return

		try {
			this.set({ $hasChanged: false, $error: null })
			let newState
			if (this._state === "draft") {
				newState = await updateRightSplits(
					this[$workpiece].id,
					this._exportRightsSplits()
				)
			} else {
				newState = await createRightSplits(
					this[$workpiece].id,
					this._exportRightsSplits()
				)
			}

			this._updateRightsSplits(newState)
		} catch (e) {
			this.set({ $hasChanged: true, $error: e })
			throw e
		}
	}
}

export class RightSplit extends Observable {
	constructor(shares) {
		super()

		if (shares) this.updateShares(shares)
	}

	removeRightHolder(rightHolder_id) {
		if (rightHolder_id in this) {
			const share = this[rightHolder_id]
			delete this[rightHolder_id]
			share[$splitsWatch]()
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

		newShare[$splitsWatch] = newShare.subscribe((...args) =>
			this.notify("share:change", newShare, ...args)
		)

		this.notify("add", newShare)
	}

	addShare(share) {
		return this.addRightHolder(share.rightHolder, share)
	}

	removeShare(share) {
		return this.removeRightHolder(share.rightHolder)
	}

	updateShares(shares) {
		const seenRightHolders = []

		shares.forEach((share) => {
			seenRightHolders.push(share.rightHolder)

			if (share.rightHolder in this) {
				this[share.rightHolder].set(share)
			} else {
				this.addShare(share)
			}
		})

		for (let rightHolder in this) {
			if (seenRightHolders.indexOf(rightHolder) < 0) {
				this.removeRightHolder(rightHolder)
			}
		}
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

import { Observable } from "../store"
import { createCrudObservable, createEntityListObservable } from "../utils/api"
import WorkpiecesCrudAPI, {
	listForUser,
	uploadFileToWorkpiece,
} from "../../../api/workpieces"

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
	}

	set(props) {
		if (props.data) {
			const { files, ...data } = props.data
			this.files._updateAll(files)
			props.data = data
		}

		super.set(props)
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
		files.forEach((file) => {
			if (file.file_id in this) {
				this[file.file_id].set({ data: file })
			} else {
				this[file.file_id] = new WorkpieceFile(this.workpiece, file, "ready")
			}
		})
	}

	$all() {
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

		return wpf
	}

	async uploadUri(metadata, fileUri) {
		if (typeof fileUri !== "string") {
			throw new Error("Invalid URI provided: not a string")
		}

		if (fileUri.indexOf("data:") !== 0) {
			throw new Error("Invalid URI provided: does not start with `data:`")
		}

		const comma_index = fileUri.indexOf(",")

		if (comma_index < 0) {
			throw new Error("Invalid URI provided: does not have a comma delimiter")
		}

		const [mimeType, format] = fileUri.substr(5, comma_index - 5).split(";")

		if (format !== "base64") {
			throw new Error("Unsupported URI provided: not in base64 format")
		}

		return await this.uploadBase64(
			{
				mimeType,
				...metadata,
			},
			fileUri.substr(comma_index + 1)
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

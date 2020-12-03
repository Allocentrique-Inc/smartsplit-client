import { observable, action, computed, toJS, isObservable } from "mobx"
import DocCreationModel from "./DocCreationModel"
import DocPerformanceModel from "./DocPerformanceModel"
import DocLyricsModel from "./DocLyricsModel"
import DocRecordingModel from "./DocRecordingModel"
import DocFilesModel from "./DocFilesModel"
import DocReleaseModel from "./DocReleaseModel"
import DocInfosModel from "./DocInfosModel"
import BaseModel from "../../../BaseModel/BaseModel"
import { saveDocumentation } from "../../../../../api/workpieces"

const makeObservable = () => {}
export default class DocumentationModel extends BaseModel {
	workpiece
	@observable creation = new DocCreationModel(this)
	@observable performance = new DocPerformanceModel(this)
	@observable lyrics = new DocLyricsModel(this)
	@observable files = new DocFilesModel(this)
	@observable recording = new DocRecordingModel(this)
	@observable release = new DocReleaseModel(this)
	@observable infos = new DocInfosModel(this)
	constructor(parent, workpiece) {
		super()
		makeObservable(this)
		this.workpiece = workpiece
		window.docModel = this
	}
	async save(section) {
		let data
		if (!section) {
			console.log(`id is ${this.workpiece.id}`)
			data = this.toJS()

			console.log()
		} else {
			data = this[section].toJS()
		}

		let response = await saveDocumentation(this.workpiece.id, section, data)
		return response
	}
}

/**
 * returns an object or array of objects cleaned from other user date except user_id
 *
 * behavior : if an object contains a property of user_id, an object with only the user_id is returned
 *            an object without a user_id is returned unaltered
 *            an array of user objects will return an array of cleaned user objects
 *
 * @return {*} an object or an array of objects with only user_ids
 */
export function cleanUsersForPosting(input) {
	// only process pure objects
	if (isObservable(input)) input = toJS(input)

	// for arrays process each entry
	if (Array.isArray(input)) {
		return input.map((obj) => cleanUsersForPosting(obj))
		// for objects that are users also process
	} else if (input.user_id) {
		return { user_id: input.user_id }
		// for other objects recurse into properties
	} else if (typeof input === "object") {
		let cleanedObject = {}
		Object.keys(input).forEach((key) => {
			cleanedObject[key] = cleanUsersForPosting(input[key])
		})
		return cleanedObject
		// for non objects return literals
	} else {
		return input
	}
}

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
import DocStreamingModel from "./DocStreamingModel"

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
	@observable streaming = new DocStreamingModel(this)
	constructor(parent, workpiece) {
		super()
		makeObservable(this)
		this.workpiece = workpiece
		window.docModel = this
	}

	/**
	 * function to save the current documentation either completely or by section
	 *
	 * Will only save if the model or sub model to save's isDirty property is true
	 *
	 * @param section {string | undefined} if set only that section will be saved
	 * @return {Promise<*>}
	 */
	async save(section) {
		if (section === "links") section = "streaming"
		console.log(`workpiece  id is ${this.workpiece.id}`)
		let data
		let isDirty = false
		// prepare to save the whole
		if (!section) {
			console.log(`saving all documention`)
			isDirty = this.isDirty
			data = this.toJS()
			// prepare to save a section
		} else {
			console.log(`saving ${section} of documentation`)
			isDirty = this[section].isDirty
			data = this[section].toJS()
		}
		try {
			if (isDirty) await saveDocumentation(this.workpiece.id, section, data)
			else console.log(`model to save is not dirty, not saving`)
			return true
		} catch (e) {}
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
		return input.user_id
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

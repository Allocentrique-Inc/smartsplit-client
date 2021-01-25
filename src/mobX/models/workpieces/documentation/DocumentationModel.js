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
	root
	workpiece
	@computed get isEmpty() {
		return (
			this.creation.isEmpty &&
			this.performance.isEmpty &&
			this.lyrics.isEmpty &&
			this.files.isEmpty &&
			this.recording.isEmpty &&
			this.release.isEmpty &&
			this.info.isEmpty &&
			this.streaming.isEmpty
		)
	}
	@computed get summary() {
		return this.initialData
	}
	@observable creation = new DocCreationModel(this)
	@observable performance = new DocPerformanceModel(this)
	@observable lyrics = new DocLyricsModel(this)
	@observable files = new DocFilesModel(this)
	@observable recording = new DocRecordingModel(this)
	@observable release = new DocReleaseModel(this)
	@observable info = new DocInfosModel(this)
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
 * in the API when we post a user we must post only the user_id instead of the object,
 * similarly with any entities we must only post entity_id rather than the entire entity
 *
 * this function will take an object (usually the output of a model.toJS() and replace
 * any object with a user_id with a string containing only that user id, and any object
 * that contains an entity_id with a string containing only the the entity_id
 *
 * @return {*} an object or an array of objects with only user_id or entity_id strings
 */
export function cleanForPosting(input) {
	// only process pure objects
	if (isObservable(input)) input = toJS(input)

	if (input === null || input === undefined) return null

	// for arrays process each entry
	if (Array.isArray(input)) {
		return input.map((obj) => cleanForPosting(obj))
		// for objects that are users also process
	} else if (input.user_id) {
		return input.user_id
		// for other objects recurse into properties
	} else if (input.entity_id) {
		return input.entity_id
	} else if (typeof input === "object") {
		let cleanedObject = {}
		Object.keys(input).forEach((key) => {
			cleanedObject[key] = cleanForPosting(input[key])
		})
		return cleanedObject
		// for non objects return literals
	} else {
		return input
	}
}

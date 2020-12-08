import { observable, action, computed, toJS, isObservable } from "mobx"
import ProtectSelectionModel from "./SelectionModel"
import BaseModel from "../../../BaseModel/BaseModel"
import { saveProtection } from "../../../../../api/workpieces"

const makeObservable = () => {}
export default class ProtectionModel extends BaseModel {
	workpiece
	@observable selection = new ProtectSelectionModel(this)
	constructor(parent, workpiece) {
		super()
		makeObservable(this)
		this.workpiece = workpiece
		window.protectModel = this
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
		console.log(`workpiece id is ${this.workpiece.id}`)
		let data
		let isDirty = false
		// prepare to save the whole
		if (!section) {
			console.log(`saving all protect`)
			isDirty = this.isDirty
			data = this.toJS()
			// prepare to save a section
		} else {
			console.log(`saving ${section} of protect`)
			isDirty = this[section].isDirty
			data = this[section].toJS()
		}
		try {
			if (isDirty) await saveProtection(this.workpiece.id, section, data)
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

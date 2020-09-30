import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"
import {
	parsePhoneNumberFromString as parse,
	AsYouType,
} from "libphonenumber-js/max"

/**
 * the model for phone numbers, not submittable
 */
export default class PhoneModel extends BaseModel {
	toJS() {
		return this.number.transform(this.number.value)
	}

	/**
	 * when submitted the key is not "mobilePhone" but "phoneNumber"
	 * @type {string}
	 */
	postAlias = "phoneNumber"

	/**
	 * rather than do the validation and formatting in the component
	 * we simply use a regular text field but are able to format it
	 * as we type and also transform it before submitting
	 * @type {Field}
	 */
	@observable number = new Field(this, "number", {
		type: FieldType.string,
		format: (v) => new AsYouType().input(v),
		validation: (v) => {
			if (!v) return null
			try {
				if (parse(v).isValid()) return null
			} catch (e) {}
			return "errors:invalidPhoneNumber"
		},
		transform: (v) => {
			if (!v) return ""
			let parsed = parse(v)
			return parsed.number
		},
	})

	/**
	 * because of the formatting we need this to actually check
	 * @return {boolean}
	 */
	@computed get numberChanged() {
		if (this.number.initialValue)
			return (
				new AsYouType().input(this.number.initialValue) != this.number.value
			)
		return false
	}

	/**
	 * this field indicates that the number has been validated via SMS and codes
	 * @type {Field}
	 */
	@observable status = new Field(this, "status", {
		type: FieldType.string,
	})
}

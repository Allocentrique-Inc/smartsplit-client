import BaseModel, { FieldType, Field } from "../BaseModel"
import { observable, action, computed } from "mobx"
export default class RegisterModel extends BaseModel {
	/// fields
	@observable email = new Field(this, "email", {
		required: true,
		requiredMessage: "errors:enterEmail",
		validation: (v) => {
			let success = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
				v
			)
			if (!success) return "errors:invalidEmail"
			return null
		},
		asyncValidation: (v) => {},
	})
	@observable password = new Field(this, "email", {
		required: true,
		validation: (v) => {
			if (v.length < 8) return "errors:passwordStrength"
			return null
		},
	})
	@observable password2 = new Field(this, "email", {
		required: true,
		pseudo: true,
		validation: (v) => {
			if (v !== this.password.value) {
				return "errors:samePasswords"
			}
		},
	})
	///computed values
	@computed get passwordStrength() {}
	@computed get passwordBarColor() {}
	@computed get passwordProgress() {}
	@computed get passwordScore() {}
}

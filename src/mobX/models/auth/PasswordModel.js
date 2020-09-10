import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"
import { Colors } from "../../../theme"
import zxcvbn from "zxcvbn"

/**
 * base class for auth models -- any model that is used fro setting a password
 * should use this model as a base class fro which to inherit
 */
export default class PasswordModel extends BaseModel {
	/// fields
	@observable password = new Field(this, "password", {
		required: true,
		validation: (v) => {
			//console.log("validating password")
			if (v.length < 8) return "errors:strengthPassword"
			return null
		},
	})
	@observable password2 = new Field(this, "password2", {
		required: true,
		pseudo: true,
		validation: (v) => {
			if (v !== this.password.value) {
				return "errors:samePasswords"
			}
		},
	})
	///computed values
	@computed get passwordStrength() {
		switch (this.passwordScore) {
			case 0:
			case 1:
				return "errors:password.weak"
			case 2:
			case 3:
				return "errors:password.average"
			case 4:
			default:
				return "errors:password.acceptable"
		}
	}
	@computed get passwordBarColor() {
		switch (this.passwordScore) {
			case 0:
				return Colors.progressBar.darkred
			case 1:
				return Colors.progressBar.orangered
			case 2:
				return Colors.progressBar.orange
			case 3:
				return Colors.progressBar.yellowgreen
			case 4:
				return Colors.progressBar.green
			default:
				return Colors.progressBar.darkred
		}
	}
	@computed get passwordProgress() {
		switch (this.passwordScore) {
			case 4:
				return 100
			case 3:
				return 80
			case 2:
				return 50
			case 1:
				return 30
			case 0:
				return 10
			default:
				return 10
		}
	}
	@computed get passwordScore() {
		console.log(`password score ${zxcvbn(this.password.value).score}`)
		return zxcvbn(this.password.value).score
	}
}

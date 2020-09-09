import BaseModel, { FieldType, Field } from "../BaseModel"
import { observable, action, computed, runInAction } from "mobx"
import { Colors } from "../../theme"
import zxcvbn from "zxcvbn"
import { registerUser, getEmail } from "../../../api/users"
import { getI18n } from "react-i18next"
export default class RegisterModel extends BaseModel {
	/// fields
	constructor(parent) {
		super(parent)
		const lang = getI18n()
		lang.on("languageChanged", () => {
			this.locale.setValue(lang.language)
		})
	}
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
		asyncValidation: async (email) => {
			try {
				let result = await getEmail(email)
				console.log(result)
				return "errors:emailExists"
			} catch (e) {
				return null
			}
		},
	})
	@observable password = new Field(this, "password", {
		required: true,
		validation: (v) => {
			console.log("validating password")
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
	@observable acceptTerms = new Field(this, "acceptTerms", {
		pseudo: true,
		validation: (v) => {
			if (!v) return "You must accept the terms"
		},
	})
	@observable locale = new Field(this, "locale", {
		default: getI18n().language,
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
	async create(lang) {
		let data = this.toJS()
		data.locale = lang
		try {
			let response = await registerUser(data)
		} catch (error) {
			if (error.code === "user_conflict")
				this.saveError = "errors:password.emailTaken"
			runInAction(() => {
				this.email.error = "errors:password.emailTaken"
			})
		}
	}
}

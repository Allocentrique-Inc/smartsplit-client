import { FieldType, Field, WithMixins } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"
import { registerUser, getEmail } from "../../../../api/users"
import { getI18n } from "react-i18next"
import PasswordModel from "./PasswordModel"

/**
 * inherits fields password and password2 form PasswordModel
 */
export default class RegisterModel extends PasswordModel {
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
				return "errors:emailTaken"
			} catch (e) {
				return null
			}
		},
	})
	@observable acceptTerms = new Field(this, "acceptTerms", {
		pseudo: true,
		type: FieldType.bool,
		required: true,
		requiredMessage: "errors:acceptTerms",
	})
	@observable locale = new Field(this, "locale", {
		default: getI18n().language,
	})
	async create(lang) {
		let data = this.toJS()
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

import { FieldType, Field, WithMixins } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"
import { registerUser, getEmail } from "../../../../api/users"
import { getI18n } from "react-i18next"
import PasswordModel from "./PasswordModel"
import { emailValidator, emailUniqueValidator } from "../validators"

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
		validation: emailValidator,
		asyncValidation: emailUniqueValidator,
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
	async create() {
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

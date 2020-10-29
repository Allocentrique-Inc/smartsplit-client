import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"
import ContributorModel from "../user/ContributorModel"
import { emailUniqueValidator, emailValidator } from "../validators"
import { getEmail } from "../../../../api/users"
export default class EmailModel extends BaseModel {
	constructor(parent, emailList) {
		super(parent)
		this.existingEmails = emailList
	}

	@observable email = new Field(this, "email", {
		label: "forms:labels.email",
		required: true,
		validation: (v) => {
			let error = emailValidator(v)
			if (error) return error
			if (this.existingEmails.filter((entry) => entry.email === v).length > 0) {
				return "errors:emailAlreadyYours"
			}
		},
	})
}

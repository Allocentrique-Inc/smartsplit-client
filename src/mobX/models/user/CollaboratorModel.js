import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"
import { emailUniqueValidator, emailValidator } from "../validators"
import ContributorModel from "./ContributorModel"
import { inviteNewUser } from "../../../../api/users"
/**
 * inherits:
 *
 * lastName,
 * firstName,
 * artistName
 *
 * and the computed "name" prop from
 *
 * Contributor model
 */
export default class CollaboratorModel extends ContributorModel {
	@observable email = new Field(this, "email", {
		label: "collaborators:email",
		required: true,
		validation: emailValidator,
		asyncValidation: emailUniqueValidator,
	})

	async create() {
		try {
			return inviteNewUser(this.toJS(true))
		} catch (e) {
			this.saveError = e.message
		}
		return false
	}

	async update() {
		{
			try {
				return UsersCrudAPI.update(this.toJS())
			} catch (e) {
				this.saveError = e.message
			}
			return false
		}
	}
}

import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"
import { emailUniqueValidator, emailValidator } from "../validators"
import ContributorModel from "./ContributorModel"
import UsersCrudAPI from "../../../../api/users"
export default class CollaboratorModel extends ContributorModel {
	/**
	 * inherits:
	 *
	 * lastName,
	 *
	 * firstName,
	 *
	 * artistName
	 *
	 * and the computed "name" prop from
	 *
	 * Contributor model
	 */

	@observable email = new Field(this, "email", {
		label: "collaborators:email",
		required: true,
		validation: emailValidator,
		asyncValidation: emailUniqueValidator,
	})

	async create() {
		try {
			return UsersCrudAPI.create(this.toJS(true))
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

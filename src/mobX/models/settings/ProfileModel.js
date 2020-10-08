import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"
import NotificationsModel from "./NotificationsModel"
import PhoneModel from "./PhoneModel"
import { updateUser } from "../../../../api/users"
import ProfessionalIdentityModel from "./ProfessionalIdentityModel"
export default class ProfileModel extends BaseModel {
	@observable avatar = new Field(this, "avatar", {
		pseudo: true,
		type: FieldType.string,
	})
	@observable avatarUrl = new Field(this, "avatarUrl", {
		type: FieldType.string,
	})
	@observable user_id = new Field(this, "user_id", {
		type: FieldType.string,
		primary: true,
	})
	@observable firstName = new Field(this, "firstName", {
		label: "forms:labels.usualFirstName",

		type: FieldType.string,
	})

	@observable lastName = new Field(this, "lastName", {
		label: "forms:labels.usualLastName",

		type: FieldType.string,
	})

	@observable artistName = new Field(this, "artistName", {
		label: "forms:labels.artistName",
		required: false,
		type: FieldType.string,
	})

	@observable locale = new Field(this, "locale", {
		label: "forms:labels.dropdowns.language",

		type: FieldType.string,
	})

	@observable address = new Field(this, "address", {
		type: FieldType.string,
	})

	@observable birthDate = new Field(this, "birthDate", {
		label: "forms:labels.myBirthday",
		type: FieldType.date,
	})

	@observable companies = new Field(this, "companies", {
		pseudo: true,
		type: FieldType.collection,
	})
	@observable identifiers = new Field(this, "identifiers", {
		pseudo: true,
		type: FieldType.map,
	})

	@observable ISNI = new Field(this, "ISNI", {
		pseudo: true,
		label: "forms:labels.isniNO",
		type: FieldType.string,
	})

	@observable URI = new Field(this, "URI", {
		pseudo: true,
		label: "forms:labels.myUri",
		type: FieldType.string,
	})

	@observable notifications = new NotificationsModel(this)

	@observable mobilePhone = new PhoneModel(this)

	@observable professional_identity = new ProfessionalIdentityModel(this)

	/**
	 * this model never creates uses
	 */
	@action async save(...args) {
		await this.validate()
		//console.log(this.toJS())
		if (this.isValid) {
			//console.log("profile model is valid! woohoo! party on the server!")
			try {
				return updateUser(this.toJS())
			} catch (e) {
				this.saveError = e.message
			}
		}
	}
}

export const IdentifierTypes = {
	SOCAN: "SOCAN",
	SOCAN_DR: "SOCAN DR",
	SOPROQ: "SOPROQ",
	Artsiti: "Artsiti",
	RESOUND: "RE:SOUND",
}

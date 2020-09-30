import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"
import NotificationsModel from "./NotificationsModel"
import PhoneModel from "./PhoneModel"
export default class ProfileModel extends BaseModel {
	@observable user_id = new Field(this, "user_id", {
		type: FieldType.string,
		primary: true,
	})
	@observable firstName = new Field(this, "firstName", {
		label: "forms:labels.usualFirstName",
		required: true,
		type: FieldType.string,
	})

	@observable lastName = new Field(this, "lastName", {
		label: "forms:labels.usualLastName",
		required: true,
		type: FieldType.string,
	})

	@observable artistName = new Field(this, "artistName", {
		label: "forms:labels.artistName",
		required: false,
		type: FieldType.string,
	})

	@observable locale = new Field(this, "locale", {
		label: "forms:labels.dropdowns.language",
		required: true,
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
		type: FieldType.collection,
	})
	@observable identifiers = new Field(this, "identifiers", {
		type: FieldType.map,
	})

	@observable ISNI = new Field(this, "ISNI", {
		label: "forms:labels.isniNO",
		type: FieldType.string,
	})

	@observable URI = new Field(this, "URI", {
		label: "forms:labels.myUri",
		type: FieldType.string,
	})

	@observable notifications = new NotificationsModel(this)

	@observable mobilePhone = new PhoneModel(this)
}

export const IdentifierTypes = {
	SOCAN: "SOCAN",
	SOCAN_DR: "SOCAN DR",
	SOPROQ: "SOPROQ",
	Artsiti: "Artsiti",
	RESOUND: "RE:SOUND",
}

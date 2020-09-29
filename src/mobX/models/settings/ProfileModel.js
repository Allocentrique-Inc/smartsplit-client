import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"

export default class ProfileModel extends BaseModel {
	@observable firstName = new Field(this, "firstName", {
		label: "forms:labels.legalFirstName",
		required: true,
		type: FieldType.string,
	})

	@observable lastName = new Field(this, "lastName", {
		label: "forms:labels.legalLastName",
		required: true,
		type: FieldType.string,
	})

	@observable artistName = new Field(this, "artistName", {
		label: "forms:labels.artistName",
		required: false,
		type: FieldType.string,
	})

	@observable address = new Field(this, "address", {
		type: FieldType.string,
	})

	@observable birthDate = new Field(this, "birthDate", {
		type: FieldType.date,
	})

	@observable companies = new Field(this, "companies", {
		type: FieldType.collection,
	})
	@observable identifiers = new Field(this, "identifiers", {
		type: FieldType.map,
	})

	@observable ISNI = new Field(this, "ISNI", {
		type: FieldType.string,
	})

	@observable URI = new Field(this, "URI", {
		type: FieldType.string,
	})
}

export const IdentifierTypes = {
	SOCAN: "SOCAN",
	SOCAN_DR: "SOCAN DR",
	SOPROQ: "SOPROQ",
	Artsiti: "Artsiti",
	RESOUND: "RE:SOUND",
}

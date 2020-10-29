import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"

export default class ContributorModel extends BaseModel {
	@observable id = new Field(this, "id", {
		primary: true,
	})

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

	@computed get name() {
		return this.firstName.value + " " + this.lastName.value
	}

	@observable artistName = new Field(this, "artistName", {
		label: "forms:labels.artistName",
		required: false,
		type: FieldType.string,
	})

	@observable groups = new Field(this, "groups", {
		label: "forms:labels.groups",
		type: FieldType.collection,
		required: false,
		requiredMessage: "Enter the name of at least one group",
	})

	@observable defaultRoles = new Field(this, "defaultRoles", {
		label: "forms:labels.defaultRoles",
		type: FieldType.collection,
		required: false,
		requiredMessage: "Pick at least one role, please",
	})
}

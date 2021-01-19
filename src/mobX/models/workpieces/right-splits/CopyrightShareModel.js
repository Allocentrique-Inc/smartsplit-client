import { observable } from "mobx"
import BaseModel, { Field, FieldType } from "../../../BaseModel"

/**
 *	Copyright shareholder model
 **/
export default class CopyrightShareModel extends BaseModel {
	@observable rightHolder = new Field(this, "rightHolder", {
		type: FieldType.string,
		primary: true,
		readonly: true,
	})
	@observable shares = new Field(this, "shares", { type: FieldType.float })
	@observable roles = new Field(this, "roles", { type: FieldType.collection })
	@observable comment = new Field(this, "comment", { type: FieldType.string })
	@observable vote = new Field(this, "vote", { type: FieldType.string })
	@observable locked = new Field(this, "locked", {
		type: FieldType.boolean,
		pseudo: true,
	})
}

/**
 *	Data object to initialize a model instance with default
 *	values
 **/
export const initShareData = {
	shares: 1,
	roles: ["author", "composer"],
	comment: "",
	vote: "undecided",
	locked: false,
}

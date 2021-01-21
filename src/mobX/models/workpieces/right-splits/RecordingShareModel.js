import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable } from "mobx"

/**
 *	Recording shareholder model
 **/
export default class RecordingShareModel extends BaseModel {
	@observable rightHolder = new Field(this, "rightHolder", {
		type: FieldType.string,
		primary: true,
		readonly: true,
	})
	@observable shares = new Field(this, "shares", { type: FieldType.float })
	@observable function = new Field(this, "function", { type: FieldType.string })
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
	shares: null,
	function: null,
	comment: "",
	vote: "undecided",
}

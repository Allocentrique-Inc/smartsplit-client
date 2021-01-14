import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable } from "mobx"

export default class PerformanceShareModel extends BaseModel {
	@observable shareholder = new Field(this, "shareholder", {
		type: FieldType.string,
		primary: true,
		readonly: true,
	})
	@observable shares = new Field(this, "shares", { type: FieldType.float })
	@observable status = new Field(this, "status", { type: FieldType.string })
	@observable roles = new Field(this, "roles", { type: FieldType.collection })
	@observable comment = new Field(this, "comment", { type: FieldType.string })
	@observable vote = new Field(this, "vote", { type: FieldType.string })
}

/**
 *	Data object to initialize a model instance with default
 *	values
 **/
export const initShareData = {
	shares: null,
	roles: [],
	status: null,
	comment: "",
	vote: "undecided",
}

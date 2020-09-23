import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class SplitCopyrightModel extends BaseModel {
	@observable shares = new Field(this, "shares", { type: FieldType.float })
	@observable roles = new Field(this, "roles", { type: FieldType.collection })
	@observable comment = new Field(this, "comment", { type: FieldType.string })
	@observable vote = new Field(this, "vote", { type: FieldType.string })
}

export const initData = {
	shares: 0,
	roles: [],
	comment: "",
	vote: "undecided",
}

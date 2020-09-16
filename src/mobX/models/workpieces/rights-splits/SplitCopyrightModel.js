import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable } from "mobx"
export default class SplitCopyrightModel extends BaseModel {
	constructor(id) {
		super()
		this.shareHolderId = id
	}

	@observable shares = new Field(this, "shares", { type: FieldType.float })
	@observable roles = new Field(this, "roles", { type: FieldType.collection })
	@observable comment = new Field(this, "comment", { type: FieldType.string })
	@observable vote = new Field(this, "vote", { type: FieldType.string })

	toJS() {
		return { shareHolderId: this.shareHolderId, ...super.toJS() }
	}
}

export const initData = {
	shares: 1,
	roles: [],
	comment: "",
	vote: "undecided",
}

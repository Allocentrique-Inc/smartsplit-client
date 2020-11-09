import { FieldType, Field } from "../../../BaseModel"
import RightSplitModel from "./RightSplitModel"
import { observable } from "mobx"
export default class RecordingSplitModel extends RightSplitModel {
	@observable shares = new Field(this, "shares", { type: FieldType.float })
	@observable status = new Field(this, "status", { type: FieldType.string })
	@observable comment = new Field(this, "comment", { type: FieldType.string })
	@observable vote = new Field(this, "vote", { type: FieldType.string })
}

export const initData = {
	shares: 0,
	status: null,
	comment: "",
	vote: "undecided",
}

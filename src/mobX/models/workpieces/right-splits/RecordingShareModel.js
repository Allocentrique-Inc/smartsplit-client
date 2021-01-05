import { FieldType, Field } from "../../../BaseModel"
import ShareModel from "./ShareModel"
import { observable } from "mobx"
export default class RecordingShareModel extends ShareModel {
	@observable shares = new Field(this, "shares", { type: FieldType.float })
	@observable function = new Field(this, "function", { type: FieldType.string })
	@observable comment = new Field(this, "comment", { type: FieldType.string })
	@observable vote = new Field(this, "vote", { type: FieldType.string })
	@observable locked = false
	toJS() {
		return { ...super.toJS(), locked: this.locked }
	}
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

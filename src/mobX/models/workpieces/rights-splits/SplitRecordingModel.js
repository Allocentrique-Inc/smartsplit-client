import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class SplitRecordingModel extends BaseModel {
	@observable shares = new Field(this, "shares", { type: FieldType.float })
	@observable role = new Field(this, "role", { type: FieldType.string })
	@observable comment = new Field(this, "comment", { type: FieldType.string })
	@observable vote = new Field(this, "vote", { type: FieldType.string })
}

import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class SplitPerformanceModel extends BaseModel {
	@observable shares = new Field(this, "shares", { type: FieldType.float })
	@observable status = new Field(this, "status", { type: FieldType.string })
	@observable comment = new Field(this, "comment", { type: FieldType.string })
	@observable vote = new Field(this, "vote", { type: FieldType.string })
}

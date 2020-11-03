import { FieldType, Field } from "../../../BaseModel"
import RightSplitModel from "./RightSplitModel"
import { observable } from "mobx"
export default class RecordingSplitModel extends RightSplitModel {
	@observable shares = new Field(this, "shares", { type: FieldType.float })
	@observable role = new Field(this, "role", { type: FieldType.string })
	@observable comment = new Field(this, "comment", { type: FieldType.string })
	@observable vote = new Field(this, "vote", { type: FieldType.string })
}

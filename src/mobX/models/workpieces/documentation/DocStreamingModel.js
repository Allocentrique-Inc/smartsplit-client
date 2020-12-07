import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class DocStreamingModel extends BaseModel {
	@observable links = new Field(this, "links", { type: FieldType.map })
}

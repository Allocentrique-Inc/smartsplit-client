import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class DocPerformanceModel extends BaseModel {
	@observable performers = new Field(this, "performers", {
		type: FieldType.collection,
	})
	@observable collaborators = new Field(this, "collaborators", {
		type: FieldType.collection,
	})
}

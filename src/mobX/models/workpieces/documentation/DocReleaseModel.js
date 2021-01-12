import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class DocReleaseModel extends BaseModel {
	@computed get isEmpty() {
		return true
	}
	@observable labels = new Field(this, "labels", {
		type: FieldType.string,
	})
	@observable formats = new Field(this, "formats", {
		type: FieldType.string,
	})
	@observable titles = new Field(this, "titles", {
		type: FieldType.string,
	})
	@observable distributors = new Field(this, "distributors", {
		type: FieldType.string,
	})
}

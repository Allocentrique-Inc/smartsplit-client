import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class DocReleaseModel extends BaseModel {
	@computed get isEmpty() {
		return (
			!this.labels.value &&
			!this.formats.value &&
			!this.titles.value &&
			!this.distributors.value
		)
	}
	@observable date = new Field(this, "date", {
		type: FieldType.date,
	})
	@observable label = new Field(this, "label", {
		type: FieldType.string,
	})
	@observable format = new Field(this, "format", {
		type: FieldType.string,
	})
	@observable support = new Field(this, "support", {
		type: FieldType.string,
	})
	@observable distributor = new Field(this, "distributor", {
		type: FieldType.string,
	})
	@observable upc = new Field(this, "upc", {
		type: FieldType.string,
	})
}

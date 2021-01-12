import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
import { cleanForPosting } from "./DocumentationModel"

/**
 *
 */
export default class DocCreationModel extends BaseModel {
	@computed get isEmpty() {
		return true
	}
	@observable creationDate = new Field(this, "creationDate", {
		type: FieldType.date,
	})
	@observable authors = new Field(this, "authors", {
		type: FieldType.set,
	})
	@observable composers = new Field(this, "composers", {
		type: FieldType.set,
	})
	@observable publishers = new Field(this, "publishers", {
		type: FieldType.set,
	})
	@observable iswc = new Field(this, "iswc", {
		label: "document:creation.iswc",
		type: FieldType.string,
	})

	/**
	 * clean
	 */
	toJS(excludePrimary) {
		return cleanForPosting(super.toJS(excludePrimary))
	}
}

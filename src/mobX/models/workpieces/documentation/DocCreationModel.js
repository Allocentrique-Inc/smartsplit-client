import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"

/**
 *
 */
export default class DocCreationModel extends BaseModel {
	@observable creationDate = new Field(this, "creationDate", {
		type: FieldType.date,
	})
	@observable authors = new Field(this, "authors", {
		type: FieldType.collection,
	})
	@observable composers = new Field(this, "composers", {
		type: FieldType.collection,
	})
	@observable editors = new Field(this, "editors", {
		type: FieldType.collection,
	})
	@observable ISWC = new Field(this, "ISWC", {
		type: FieldType.string,
	})
}

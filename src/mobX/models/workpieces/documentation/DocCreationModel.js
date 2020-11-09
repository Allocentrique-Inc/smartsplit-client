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
		type: FieldType.map,
	})
	@observable editors = new Field(this, "editors", {
		type: FieldType.map,
	})
	@observable ISWC = new Field(this, "ISWC", {
		type: FieldType.string,
	})
}

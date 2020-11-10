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
		type: FieldType.set,
	})
	@observable composers = new Field(this, "composers", {
		type: FieldType.set,
	})
	@observable publishers = new Field(this, "publishers", {
		type: FieldType.set,
	})
	@observable iswc = new Field(this, "iswc", {
		type: FieldType.string,
	})
}

import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"

/**
 *
 */
export default class DocCreationModel extends BaseModel {
	creationDate = new Field(this, "creationDate", {
		type: FieldType.date,
	})
	authors = new Field(this, "authors", {
		type: FieldType.collection,
	})
	composers = new Field(this, "composers", {
		type: FieldType.collection,
	})
	editors = new Field(this, "editors", {
		type: FieldType.collection,
	})
}

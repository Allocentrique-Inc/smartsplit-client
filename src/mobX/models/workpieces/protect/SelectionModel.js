import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable } from "mobx"
import { cleanUsersForPosting } from "./ProtectionModel"

export default class SelectionModel extends BaseModel {
	@observable authors = new Field(this, "authors", {
		type: FieldType.set,
	})
	@observable files = new Field(this, "files", {
		type: FieldType.set,
	})
	@observable fileSelectedId = new Field(this, "fileSelectedId", {
		type: FieldType.int
	})
	@observable fileAdd = new Field(this, "fileAdd", {
		type: FieldType.object
	})

	@observable versionType = new Field(this, "versionType", {
		type: FieldType.string
	})

	@observable demoName = new Field(this, "demoName", {
		type: FieldType.string
	})

	/**
	 * clean
	 */
	toJS(excludePrimary) {
		return cleanUsersForPosting(super.toJS())
	}
}

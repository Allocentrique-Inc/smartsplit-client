import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable } from "mobx"
import { cleanUsersForPosting } from "./ProtectionModel"

export default class SelectionModel extends BaseModel {
	@observable authors = new Field(this, "authors", {
		type: FieldType.set,
	})

	/**
	 * clean
	 */
	toJS(excludePrimary) {
		return cleanUsersForPosting(super.toJS())
	}
}

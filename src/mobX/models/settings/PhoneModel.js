import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"

export default class PhoneModel extends BaseModel {
	@observable number = new Field(this, "number", {
		type: FieldType.string,
	})

	@observable status = new Field(this, "status", {
		type: FieldType.string,
	})
}

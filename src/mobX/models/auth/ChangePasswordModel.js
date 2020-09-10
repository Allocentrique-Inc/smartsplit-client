import { observable } from "mobx"
import PasswordModel from "./PasswordModel"
import { FieldType, Field, WithMixins } from "../../BaseModel"
/**
 * ChangePasswordModel inherits from Password Model
 */
export default class ChangePasswordModel extends PasswordModel {
	@observable currentPassword = new Field(this, "currentPassword", {
		required: true,
		type: FieldType.text,
		label: "forms:labels.currentPassword",
	})
}

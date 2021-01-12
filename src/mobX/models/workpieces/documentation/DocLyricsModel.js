import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class DocLyricsModel extends BaseModel {
	@computed get isEmpty() {
		return true
	}
	text = new Field(this, "text", {
		type: FieldType.string,
	})
	languages = new Field(this, "languages", { type: FieldType.set })
	access = new Field(this, "access", {
		type: FieldType.string,
		default: "public",
	})
}

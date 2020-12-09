import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class DocLyricsModel extends BaseModel {
	text = new Field(this, "texts", {
		type: FieldType.string,
	})
	languages = new Field(this, "languages", { type: FieldType.set })
	access = new Field(this, "access", {
		type: FieldType.string,
		default: "public",
	})
}

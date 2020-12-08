import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class DocLyricsModel extends BaseModel {
	texts = new Field(this, "texts", {
		type: FieldType.object,
		transform: (v) => (v.split ? v.split("\n") : v),
	})
	languages = new Field(this, "languages", { type: FieldType.set })
	public = new Field(this, "public", { type: FieldType.bool })
}

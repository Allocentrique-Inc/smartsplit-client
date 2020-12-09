import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class DocLyricsModel extends BaseModel {
	texts = new Field(this, "texts", {
		type: FieldType.object,
	})
	languages = new Field(this, "languages", { type: FieldType.set })
	access = new Field(this, "access", { type: FieldType.int, default: true })
	importData(obj) {
		if (obj) {
			return {
				...obj,
				texts: obj.texts.join("\n"),
				access: parseInt(obj.access),
			}
		} else return null
	}
	toJS() {
		return { ...super.toJS(), texts: this.texts.value.split("\n") }
	}
}

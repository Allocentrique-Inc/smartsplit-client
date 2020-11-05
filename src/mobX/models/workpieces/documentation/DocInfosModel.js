import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class DocInfosModel extends BaseModel {
	@observable length = new Field(this, "length", { type: FieldType.string })
	@observable bpm = new Field(this, "bpm", { type: FieldType.string })
	@observable primaryGenre = new Field(this, "primaryGenre", {
		type: FieldType.string,
	})
	@observable secondaryGenres = new Field(this, "secondaryGenres")
}

import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class DocFilesModel extends BaseModel {
	@observable scores = new Field(this, "scores", { type: FieldType.collection })
	@observable midi = new Field(this, "midi", { type: FieldType.collection })
	@observable audio = new Field(this, "audio", { type: FieldType.collection })
	@observable images = new Field(this, "images", { type: FieldType.collection })
}

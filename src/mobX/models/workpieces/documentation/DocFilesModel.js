import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class DocFilesModel extends BaseModel {
	@computed get isEmpty() {
		return (
			this.scores.array.length === 0 &&
			this.midi.array.length === 0 &&
			this.audio.array.length === 0 &&
			this.images.array.length === 0
		)
	}
	@observable scores = new Field(this, "scores", { type: FieldType.collection })
	@observable midi = new Field(this, "midi", { type: FieldType.collection })
	@observable audio = new Field(this, "audio", { type: FieldType.collection })
	@observable images = new Field(this, "images", { type: FieldType.collection })
}

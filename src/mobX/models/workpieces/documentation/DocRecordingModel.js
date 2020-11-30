import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"

export default class DocRecordingModel extends BaseModel {
	@observable director = new Field(this, "director", {type: FieldType.collection})
	@observable recordedBy = new Field(this, "recordedBy", {type: FieldType.collection})
	@observable mixedBy = new Field(this, "mixedBy", {type: FieldType.collection})
	@observable masteredBy = new Field(this, "masteredBy", {type: FieldType.collection})
	@observable producedBy = new Field(this, "producedBy", {type: FieldType.collection})
	@observable recordingStudio = new Field(this, "recordingStudio", {type: FieldType.collection})
	@observable masteringStudio = new Field(this, "masteringStudio", {type: FieldType.collection})
	@observable recordingDates = new Field(this, "recordingDates", {type: FieldType.collection})
	@observable mixingDates = new Field(this, "mixingDates", {type: FieldType.collection})
	@observable masteringDates = new Field(this, "masteringDates", {type: FieldType.collection})
	@observable isrc = new Field(this, "isrc", {type: FieldType.string})
}

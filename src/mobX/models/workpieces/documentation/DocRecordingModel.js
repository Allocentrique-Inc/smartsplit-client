import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"

export default class DocRecordingModel extends BaseModel {
	@observable director = new Field(this, "director", {})
	@observable recordedBy = new Field(this, "recordedBy", {})
	@observable mixedBy = new Field(this, "mixedBy", {})
	@observable masteredBy = new Field(this, "masteredBy", {})
	@observable recordingStudio = new Field(this, "recordingStudio", {})
	@observable masteringStudio = new Field(this, "masteringStudio", {})
	@observable recordingDates = new Field(this, "recordingDates", {})
	@observable mixingDates = new Field(this, "mixingDates", {})
	@observable masteringDates = new Field(this, "masteringDates", {})
	@observable isrc = new Field(this, "isrc", {})
}

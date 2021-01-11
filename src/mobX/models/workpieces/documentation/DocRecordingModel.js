import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"

export default class DocRecordingModel extends BaseModel {
	@computed get isEmpty() {
		return true
	}
	@observable director = new Field(this, "director", {
		type: FieldType.collection,
	})
	@observable recordedBy = new Field(this, "recordedBy", {
		type: FieldType.collection,
	})
	@observable mixedBy = new Field(this, "mixedBy", {
		type: FieldType.collection,
	})
	@observable masteredBy = new Field(this, "masteredBy", {
		type: FieldType.collection,
	})
	@observable producedBy = new Field(this, "producedBy", {
		type: FieldType.collection,
	})
	@observable recordingStudio = new Field(this, "recordingStudio", {
		type: FieldType.collection,
	})
	@observable recordingDate = new Field(this, "recordingDate", {
		type: FieldType.date,
	})
	@observable isrc = new Field(this, "isrc", { type: FieldType.string })

	populateEntry(engineers, date, studio) {
		let entry = { engineers: engineers }
		if (date) entry.date = { from: date }
		if (studio) entry.studio = studio.name
		return entry
	}
	toJS(excludePrimary) {
		/// return blank object for now
		let values = super.toJS(excludePrimary)

		return {
			director: values.director,
			producer: values.producer,
			isrc: values.isrc,
			recording: [
				this.populateEntry(
					values.recordedBy,
					values.recordingDate,
					values.recordingStudio
				),
			],
			mixing: [this.populateEntry(values.mixedBy)],
			mastering: [this.populateEntry(values.masteredBy)],
		}
	}
}

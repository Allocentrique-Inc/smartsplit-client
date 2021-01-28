import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
import { cleanForPosting } from "./DocumentationModel"

export default class DocRecordingModel extends BaseModel {
	@computed get isEmpty() {
		return (
			this.directors.array.length === 0 &&
			this.recordedBy.array.length === 0 &&
			this.mixedBy.array.length === 0 &&
			this.masteredBy.array.length === 0 &&
			this.producedBy.array.length === 0 &&
			this.recordingStudio.array.length === 0 &&
			this.recordingDate.array.length === 0 &&
			!this.isrc.value
		)
	}
	@observable directors = new Field(this, "directors", {
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
		type: FieldType.string,
	})
	@observable recordingDate = new Field(this, "recordingDate", {
		type: FieldType.date,
	})
	@observable isrc = new Field(this, "isrc", { type: FieldType.string })

	populateEntry(engineers, date, studio) {
		let entry = { engineers: engineers }
		if (date) entry.date = { from: date }
		if (studio) entry.studio = studio
		return entry
	}
	toJS(excludePrimary) {
		/// return blank object for now
		let values = super.toJS(excludePrimary)
		console.log(values)
		return cleanForPosting({
			directors: values.directors,
			producers: values.producedBy,
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
		})
	}

	/**
	 * The API Schema allows for much more information than is available in the UI
	 * this method allows us to use a simpler binding model that we currently have
	 * it translates the more complex schema into a simpler JS object which will
	 * initialize the model
	 * @param data
	 * @returns {{}}
	 */
	importData(data) {
		//return data
		let returnData = {}
		if (data.recording.length) {
			returnData.recordedBy = data.recording[0].engineers
			if (data.recording[0].date)
				returnData.recordingDate = data.recording[0].date.from
			if (data.recording[0].studio)
				returnData.recordingStudio = [data.recording[0].studio]
		}
		if (data.mixing.length) returnData.mixedBy = data.mixing[0].engineers
		if (data.mastering.length)
			returnData.masteredBy = data.mastering[0].engineers
		returnData.isrc = data.isrc
		returnData.directors = data.directors
		returnData.producedBy = data.producers
		return returnData
	}
}

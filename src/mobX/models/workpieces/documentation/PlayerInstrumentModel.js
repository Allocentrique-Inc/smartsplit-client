import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
const makeObservable = () => {}
export default class PlayerInstrumentModel extends BaseModel {
	constructor(parent) {
		super(parent)
		makeObservable(this)
	}
	@observable instrument = new Field(this, "instrument", {
		type: FieldType.object,
		required: true,
	})
	@observable role = new Field(this, "role", { type: FieldType.object })
	@observable notes = new Field(this, "notes", { type: FieldType.string })
	toJS() {
		let js = super.toJS()
		js = { ...js, instrument: js.instrument.entity_id }
		console.log(js)
		return js
	}
}

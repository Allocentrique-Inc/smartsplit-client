import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed } from "mobx"
import WorkpieceAPI from "../../../../api/workpieces"
export default class WorkpieceModel extends BaseModel {
	@observable workpiece_id = new Field(this, "workpiece_id", {
		type: FieldType.string,
		primary: true,
	})
	@observable title = new Field(this, "title", {
		type: FieldType.string,
		required: true,
	})

	async create() {
		return WorkpieceAPI.create(this.toJS(true))
	}
	async update() {
		return WorkpieceAPI.update(this.workpiece_id.value, this.toJS(true))
	}
}

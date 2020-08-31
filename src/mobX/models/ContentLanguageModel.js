import BaseModel, { FieldType, Field } from "../BaseModel"
import { observable, action, computed } from "mobx"
import createCRUD from "../../../api/entities"
export default class ContentLanguageModel extends BaseModel {
	CRUD = createCRUD("entities")
	@observable entity_id = new Field(this, "entity_id", {
		type: FieldType.string,
		required: true,
	})
	@observable name_en = new Field(this, "name_en", {
		type: FieldType.string,
		required: true,
	})
	@observable name_fr = new Field(this, "name_fr", {
		type: FieldType.string,
		required: true,
	})

	dataMap = {
		entity_id: "entity_id",
		name_en: ["name", "en"],
		name_fr: ["name", "fr"],
	}
	@action async create(...args) {
		let data = this.exportData()
		return this.CRUD.create(data)
	}
	@action async update(...args) {
		let data = this.exportData()
		return this.CRUD.update(data)
	}
}

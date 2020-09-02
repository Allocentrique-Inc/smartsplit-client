import BaseModel, { FieldType, Field } from "../BaseModel"
import { observable, action, computed } from "mobx"
import CRUD from "../../../api/entities"
export default class ContentLanguageModel extends BaseModel {
	//CRUD = createCRUD("entities")
	@observable entity_id = new Field(this, "entity_id", {
		type: FieldType.string,
		required: true,
		validation: (value) => {
			return /^[A-Za-z0-9]+$/.test(value)
		},
		asyncValidation: async (value) => {
			let entity = await CRUD.read(value)
			if (entity) return "error.entityConflict"
			else return null
		},
	})
	@observable name_en = new Field(this, "name_en", {
		type: FieldType.string,
		required: true,
		validation: (value) => {
			if (/^[A-Za-z0-9]+$/.test(value)) return null
			else return "error.invalidName"
		},
	})
	@observable name_fr = new Field(this, "name_fr", {
		type: FieldType.string,
		required: true,
		validation: (value) => {
			if (/^[A-Za-z0-9]+$/.test(value)) return null
			else return "error.invalidName"
		},
	})

	dataMap = {
		entity_id: "entity_id",
		name_en: ["name", "en"],
		name_fr: ["name", "fr"],
	}

	@action async create(...args) {
		let data = this.exportData()
		return CRUD.create(data)
	}

	@action async update(...args) {
		let data = this.exportData()
		return CRUD.update(data)
	}
}

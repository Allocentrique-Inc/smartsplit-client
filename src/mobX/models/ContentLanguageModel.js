import BaseModel, { FieldType, Field } from "../BaseModel"
import { observable, action, computed } from "mobx"
import CRUD from "../../../api/entities"
export default class ContentLanguageModel extends BaseModel {
	//CRUD = createCRUD("entities")
	@observable entity_id = new Field(this, "entity_id", {
		type: FieldType.string,
		required: true,
		validation: (value) => {
			if (/^[A-Za-z0-9]+$/.test(value)) return null
			else return "errors:invalidName"
		},
		asyncValidation: async (value) => {
			try {
				await CRUD.read(value)
				return "errors:entityConflict"
			} catch (e) {
				return null
			}
		},
	})
	@observable name_en = new Field(this, "name_en", {
		type: FieldType.string,
		required: true,
		label: "admin:entityAttributes.name",
		validation: (value) => {
			if (/^[A-Za-z0-9]+$/.test(value)) return null
			else return "errors:invalidName"
		},
	})
	@observable name_fr = new Field(this, "name_fr", {
		type: FieldType.string,
		required: true,
		label: "admin:entityAttributes.name",
		validation: (value) => {
			if (/^[A-Za-z0-9]+$/.test(value)) return null
			else return "errors:invalidName"
		},
	})

	dataMap = {
		entity_id: "entity_id",
		name_en: ["name", "en"],
		name_fr: ["name", "fr"],
	}

	@action async create(...args) {
		let data = this.exportData()
		console.log(data)
		return CRUD.create(data)
	}

	@action async update(...args) {
		let data = this.exportData()
		return CRUD.update(data)
	}
}

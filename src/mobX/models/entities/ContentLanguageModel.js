import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed } from "mobx"
export default class ContentLanguageModel extends BaseModel {
	//CRUD = createCRUD("entities")
	constructor(parent, CRUD) {
		super(parent)
		this.CRUD = CRUD
	}
	@observable entity_id = new Field(this, "entity_id", {
		type: FieldType.string,
		required: true,
		validation: (value) => {
			if (/^[A-Za-z0-9]+$/.test(value)) return null
			else return "errors:invalidName"
		},
		asyncValidation: async (value) => {
			try {
				//console.log(this.isNew)
				await this.CRUD.read(value)
				if (this.isNew) return "errors:entityConflict"
				else return null
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

	importData(data) {
		return {
			entity_id: data.entity_id,
			name_en: data.name.en,
			name_fr: data.name.fr,
		}
	}
	exportData(data) {
		return {
			entity_id: data.entity_id,
			name: {
				en: data.name_en,
				fr: data.name_fr,
			},
		}
	}
	@action async create(...args) {
		//console.log("create called")
		let data = this.exportData(this.toJS())
		//console.log(data)
		return this.CRUD.create(data)
	}

	@action async update(...args) {
		let data = this.exportData(this.toJS())
		let id = data.entity_id
		delete data.entity_id
		//console.log(data)
		return this.CRUD.update(id, data)
	}
}

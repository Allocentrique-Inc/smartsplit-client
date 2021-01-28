import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class DocReleaseModel extends BaseModel {
	@computed get isEmpty() {
		return (
			!this.labels.value &&
			!this.formats.value &&
			!this.titles.value &&
			!this.distributors.value
		)
	}
	@observable date = new Field(this, "date", {
		type: FieldType.date,
	})
	@observable label = new Field(this, "label", {
		type: FieldType.string,
	})
	@observable format = new Field(this, "format", {
		type: FieldType.string,
	})

	@observable isDigital = new Field(this, "isDigital", {
		type: FieldType.bool,
		pseudo: true,
	})

	@observable isPhysical = new Field(this, "isPhysical", {
		type: FieldType.bool,
		pseudo: true,
	})

	@observable support = new Field(this, "support", {
		type: FieldType.string,
	})
	@observable distributor = new Field(this, "distributor", {
		type: FieldType.string,
	})
	@observable upc = new Field(this, "upc", {
		type: FieldType.string,
	})
	toJS() {
		let js = super.toJS()
		js.support =
			(this.isDigital.value ? "digital," : "") +
			(this.isPhysical.value ? "physical" : "")
		console.log(js)
		return js
	}

	importData(obj) {
		if (obj) {
			let returnObj = JSON.parse(JSON.stringify(obj))
			if (obj.support) {
				returnObj.isPhysical = obj.support.indexOf("physical") > -1
				returnObj.isDigital = obj.support.indexOf("digital") > -1
			}
			return returnObj
		} else {
			return obj
		}
	}
}

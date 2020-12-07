import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
export default class DocStreamingModel extends BaseModel {
	@observable links = new Field(this, "links", { type: FieldType.map })
	toJS() {
		let values = super.toJS().links
		let links = []
		Object.keys(values).forEach((key) => {
			links.push({ platform: key, url: values[key] })
		})
		return { links: links }
	}
}

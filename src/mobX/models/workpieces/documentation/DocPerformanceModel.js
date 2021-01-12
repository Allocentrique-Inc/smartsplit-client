import BaseModel, { FieldType, Field } from "../../../BaseModel"
import { observable, action, computed } from "mobx"
import ModelCollection from "../../../BaseModel/ModelCollection"
import PerformerModel from "./PerformerModel"
import { cleanForPosting } from "./DocumentationModel"
export default class DocPerformanceModel extends BaseModel {
	@observable conductor = new Field(this, "conductor", {
		type: FieldType.object,
	})
	@observable performers = new ModelCollection(this, "performers", {
		modelClass: PerformerModel,
	})
}

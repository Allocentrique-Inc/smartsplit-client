import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"
export default class ProfessionalIdentityModel extends BaseModel {
	@observable socan = new Field(this, "socan", { type: FieldType.string })
	@observable sodrac = new Field(this, "sodrac", { type: FieldType.string })
	@observable soproq = new Field(this, "soproq", { type: FieldType.string })
	@observable resound = new Field(this, "resound", { type: FieldType.string })
	@observable artisti = new Field(this, "artisti", { type: FieldType.string })
	@observable public = new Field(this, "public", { type: FieldType.boolean })
}

import BaseModel, { FieldType, Field } from "../../BaseModel"
import { observable, action, computed, runInAction } from "mobx"
export default class ProfessionalIdentityModel extends BaseModel {
	@observable ids = new Field(this, "ids", {
		type: FieldType.collection,
		default: [
			{ name: "socan", value: "111111111" },
			{ name: "sodec", value: "111111111" },
			{ name: "artisti", value: "111111111" },
		],
	})
	@observable public = new Field(this, "public", { type: FieldType.boolean })
}

export const ProIds = [
	"socan",
	"socandr",
	"spacq",
	"apem",
	"soproq",
	"adisq",
	"artisti",
	"uda",
	"gmmq",
	"cmrra",
	"sac",
	"cmpa",
	"re_sound",
	"connect",
	"cima",
	"actra racs",
	"mroc",
	"actra",
	"cfm",
]

export const ProIdIcons = {
	socan: "c",
	socandr: "c",
	spacq: "c",
	apem: "c",
	soproq: "p",
	adisq: "p",
	artisti: "star",
	uda: "star",
	gmmq: "star",
	cmrra: "c",
	sac: "c",
	cmpa: "c",
	re_sound: "star",
	connect: "p",
	cima: "p",
	actraracs: "star",
	mroc: "star",
	actra: "star",
	cfm: "star",
}

import BaseModel from "../../../BaseModel"

/**
 *	Specialized base model class for the 3 share models
 **/
export default class ShareModel extends BaseModel {
	constructor() {
		super()
	}
	toJS() {
		return { shareholderId: this.shareholderId, ...super.toJS() }
	}

	init(data = this.defaultData) {
		this.shareholderId = data.shareholderId
		super.init(data)
	}
}

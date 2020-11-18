import BaseModel from "../../../BaseModel"

/**
 *	Specialized base model class for the 3 right splits
 **/
export default class RightSplitModel extends BaseModel {
	constructor(id) {
		super()
		this.shareholderId = id
	}
	toJS() {
		return { shareholderId: this.shareholderId, ...super.toJS() }
	}
}

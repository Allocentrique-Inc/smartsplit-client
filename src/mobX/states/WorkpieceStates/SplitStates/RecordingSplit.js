import SplitState from "./SplitState"
import RecordingSplitModel, {
	initData,
} from "../../../models/workpieces/rights-splits/RecordingSplitModel"
import { action, observable } from "mobx"

/**
 *	Recording split domain state derived from SplitState.
 **/
export default class RecordingSplit extends SplitState {
	constructor(shares) {
		super(shares, RecordingSplitModel, initData)
	}
	functionValues = [
		"producer",
		"autoProducer",
		"directorProducer",
		"techProducer",
		"studio",
		"illustratorDesigner",
	]
	@observable mode = "equal"
	@action setShareFunction(id, value) {
		this.updateShareField(id, "function", value)
		this.updateShareField(id, "shares", 1)
	}
}

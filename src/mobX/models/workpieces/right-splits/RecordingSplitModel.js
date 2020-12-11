import RightSplitModel from "./RightSplitModel"
import RecordingShareModel, { initShareData } from "./RecordingShareModel"
import { action, observable } from "mobx"

/**
 *	Recording split domain state derived from SplitDomainState.
 **/
export default class RecordingSplitModel extends RightSplitModel {
	constructor() {
		super(RecordingShareModel, initShareData)
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

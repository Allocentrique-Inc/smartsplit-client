import SplitState from "./SplitState"
import RecordingSplitModel from "../../../models/workpieces/rights-splits/RecordingSplitModel"
import { observable } from "mobx"

/**
 *	Recording split domain state derived from SplitState.
 **/
export default class RecordingSplit extends SplitState {
	constructor(shares) {
		super(shares, RecordingSplitModel)
	}
	@observable mode = "equal"
}

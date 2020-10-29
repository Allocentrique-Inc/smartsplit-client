import SplitState from "./SplitState"
import PerformanceSplitModel from "../../../models/workpieces/rights-splits/PerformanceSplitModel"
import { observable } from "mobx"

/**
 *	Performance split domain state derived from SplitState.
 *	Contains 80 20 middleware
 **/
export default class PerformanceSplit extends SplitState {
	constructor(shares) {
		super(shares, PerformanceSplitModel)
	}
	@observable mode = "equal"
	statusValues = [
		"principal",
		"featured",
		"bandMember",
		"session"
	]
}

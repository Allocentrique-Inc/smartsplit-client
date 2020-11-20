import SplitState from "./SplitState"
import PerformanceSplitModel, {
	initData,
} from "../../../models/workpieces/rights-splits/PerformanceSplitModel"
import { action, computed, reaction } from "mobx"

/**
 *	Performance split domain state derived from SplitState.
 *	Contains 80 20 middleware
 **/
export default class PerformanceSplit extends SplitState {
	constructor(shares) {
		super(shares, PerformanceSplitModel, initData)
		reaction(
			() => this.shareholders.size,
			() => this.updateShares()
		)
	}

	statusValues = ["principal", "featured", "bandMember", "session"]

	@computed get majorShares() {
		return this.sharesValues.filter(
			(share) => share.status && share.status !== "session"
		)
	}

	@computed get minorShares() {
		return this.sharesValues.filter(
			(share) => share.status && share.status === "session"
		)
	}

	@computed get mode() {
		if (
			(this.majorShares.length > 0 && this.minorShares.length === 0) ||
			(this.majorShares.length === 0 && this.minorShares.length > 0)
		) {
			return "equal"
		} else if (this.majorShares.length > 0 && this.minorShares.length > 0) {
			return "80-20"
		} else {
			return null
		}
	}

	@action setShareStatus(id, status) {
		this.updateShareField(id, "status", status)
		this.updateShares()
	}

	@action updateShares() {
		if (this.mode === "equal") {
			this.setShares(
				this.minorShares.length === 0 ? this.majorShares : this.minorShares
			)
			this.setShares(
				this.minorShares.length === 0 ? this.minorShares : this.majorShares,
				0
			)
		} else if (this.mode === "80-20") {
			this.setShares(
				this.majorShares,
				(0.8 * this.shareholders.size) / this.majorShares.length
			)
			this.setShares(
				this.minorShares,
				(0.2 * this.shareholders.size) / this.minorShares.length
			)
		}
	}
}

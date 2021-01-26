import RightSplitModel from "./RightSplitModel"
import PerformanceShareModel, { initShareData } from "./PerformanceShareModel"
import { action, computed, reaction } from "mobx"

/**
 *	Performance split model derived from RightSplitModel.
 *	Contains 80 20 middleware
 **/
export default class PerformanceSplitModel extends RightSplitModel {
	constructor(parent) {
		super(parent, PerformanceShareModel, initShareData)
		reaction(
			() => this.shareholders.length,
			() => this.updateShares()
		)
	}

	type = "performance"

	statusValues = ["principal", "featured", "bandMember", "session"]

	@computed get majorShares() {
		return this.shareholdersValues.filter(
			(shareholder) => shareholder.status && shareholder.status !== "session"
		)
	}

	@computed get minorShares() {
		return this.shareholdersValues.filter(
			(shareholder) => shareholder.status && shareholder.status === "session"
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
			//console.log("DEBUG", this.shareholders.length)
			this.setShares(
				this.majorShares,
				(0.8 * this.shareholders.length) / this.majorShares.length
			)
			this.setShares(
				this.minorShares,
				(0.2 * this.shareholders.length) / this.minorShares.length
			)
		}
	}
}

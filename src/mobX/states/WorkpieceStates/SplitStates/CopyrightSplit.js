import SplitState from "./SplitState"
import CopyrightSplitModel from "../../../models/workpieces/rights-splits/CopyrightSplitModel"
import { action, observable, reaction } from "mobx"

/**
 *	Copyright split domain state derived from SplitState.
 *	Contains manual mode middleware logic
 **/
export default class CopyrightSplit extends SplitState {
	constructor(shares) {
		super(shares, CopyrightSplitModel)
		/**
		 * reaction that performs roles checking upon
		 * mode change to or from "equal"
		 **/
		reaction(
			() => this.mode,
			(mode) => {
				if (mode === "equal" && !this.equalModeInitiated) {
					this.initEqualMode()
				} else {
					this.equalModeInitiated = false
				}
			},
			{ fireImmediately: true }
		)

		/**
		 * Reaction that resets this.equalModeInitiated when
		 * adding or removing a shareholder
		 */
		reaction(
			() => this.shareHolders.keys(),
			() => {
				if (this.mode === "equal") {
					this.initEqualMode()
				}
			}
		)
	}

	@observable mode = "equal"
	@observable equalModeInitiated = false

	@action initEqualMode() {
		this.equalModeInitiated = true
		this.shareHolders.forEach((share, _) => {
			!share.roles.includes("author") && share.roles.push("author")
			!share.roles.includes("composer") && share.roles.push("composer")
		})
	}

	@action updateShare(id, value) {
		if (!this.shareHolders.has(id)) {
			throw new Error(`Error: share holder ${id} not found`)
		}
		// Difference between actual share and value to apply
		// console.log("UPDATE SHARE", this.shareHolders.get(id))

		const diff = value - this.shareHolders.get(id).shares.value
		// Select other candidate shares
		const sortedShares = [...this.shareHolders.values()]
			.filter((share) => share.shareHolderId !== id)
			.sort((a, b) => a.shares.value - b.shares.value)

		// If diff < 0, we subtract a portion from the shareholder and then
		// splitting it between other shareholders
		if (diff < 0) {
			this.applyDiffToShares(-diff / sortedShares.length, sortedShares)
		} else {
			//	Algorithm to split as equally as possible the
			//	difference (value - shareholder shares)
			//	Difference is equally subtracted to other shares as
			//	much as the current smallest share > 0, and so on
			//	until difference = 0
			let toSplit = diff
			while (toSplit > 0) {
				// 1. Filter shares equal to 0
				const shares = sortedShares.filter((share) => share.shares.value > 0)

				// 2. Select smallest non-zero share
				let smallestShare
				try {
					smallestShare = shares[0].toJS()
				} catch (e) {
					console.error("Error with smallest share", e, shares)
				}

				// 3. Try an equal split of toSplit
				toSplit = toSplit - shares.length * smallestShare.shares

				if (toSplit > 0) {
					this.applyDiffToShares(-smallestShare.shares, shares)
				} else {
					this.applyDiffToShares(
						-(smallestShare.shares + toSplit / shares.length),
						shares
					)
				}
			}
		}

		this.shareHolders.get(id).setValue("shares", value)
	}
}

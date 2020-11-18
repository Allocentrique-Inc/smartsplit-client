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
}

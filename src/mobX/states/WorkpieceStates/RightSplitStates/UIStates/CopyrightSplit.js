import { action, computed } from "mobx"
import CircledC from "../../../../../svg/circled-c"
import SplitUIState from "./SplitUIState"
import CopyrightForm from "../../../../../pages/workpieces/rights-splits/copyright"

/**
 *  Copyright form page UI state
 **/
export default class CopyrightSplit extends SplitUIState {
	constructor(rightSplit, shareholdersColors) {
		super(rightSplit, CircledC, shareholdersColors)
	}

	progress = (1 / 3) * 100
	form = CopyrightForm
	/**
	 *	Action to initialize the ui state. Shares are an array
	 *	of shareholders stripped values from their observables
	 **/
	@action init(pageTitle, titleLeft, titleRight) {
		super.init(pageTitle)
		// Titles of Dual pie chart halfs
		this.titleLeft = titleLeft
		this.titleRight = titleRight
	}

	/**
	 *	Computed array of data objects
	 *	used by the UI
	 **/
	@computed get sharesData() {
		return this.shares.map((share) => {
			let percent
			if (this.shareTotal > 0 && share.shares) {
				percent = (100 * share.shares) / this.shareTotal
			} else {
				percent = 0
			}
			return {
				id: share.shareholderId,
				shares: share.shares,
				roles: share.roles,
				percent: percent,
				locked: share.locked || this.shares.length === 1,
			}
		})
	}

	isMixerDisabled(roles) {
		return (
			!this.rightSplit.domainState.composerChosen && !roles.includes("mixer")
		)
	}

	isAdapterDisabled(roles) {
		return (
			!this.rightSplit.domainState.authorChosen && !roles.includes("adapter")
		)
	}

	genChartProps(mode) {
		if (mode === "roles") {
			return {
				dataLeft: this.sharesToChartData(
					this.rightSplit.domainState.lyricsContributors.map((contrib) => ({
						...contrib,
						shares: 1,
					}))
				),
				dataRight: this.sharesToChartData(
					this.rightSplit.domainState.musicContributors.map((contrib) => ({
						...contrib,
						shares: contrib.weighting,
					}))
				),
				size: this.chartSize,
				logo: this.logo,
				titleLeft: this.titleLeft,
				titleRight: this.titleRight,
			}
		} else {
			return super.genChartProps()
		}
	}
}

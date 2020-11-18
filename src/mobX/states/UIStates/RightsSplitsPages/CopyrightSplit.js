import { action, computed } from "mobx"
import CircledC from "../../../../svg/circled-c"
import SplitPageState from "./SplitPageState"
import CopyrightForm from "../../../../pages/workpieces/rights-splits/copyright"

/**
 *  Copyright form page UI state
 **/
export default class CopyrightSplit extends SplitPageState {
	constructor() {
		super(CircledC)
	}

	progress = (1 / 3) * 100
	form = CopyrightForm
	/**
	 *	Action to initialize the ui state. Shares are an array
	 *	of shareholders stripped values from their observables
	 **/
	@action init(domainState, pageTitle, titleLeft, titleRight) {
		super.init(domainState, pageTitle)
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
			}
		})
	}

	isMixerDisabled(roles) {
		return !this.domainState.composerChosen && !roles.includes("mixer")
	}

	isAdapterDisabled(roles) {
		return !this.domainState.authorChosen && !roles.includes("adapter")
	}

	genChartProps(mode) {
		if (mode === "roles") {
			return {
				dataLeft: this.sharesToChartData(
					this.domainState.lyricsContributors.map((contrib) => ({
						...contrib,
						shares: 1,
					}))
				),
				dataRight: this.sharesToChartData(
					this.domainState.musicContributors.map((contrib) => ({
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

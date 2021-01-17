import { action, computed } from "mobx"
import CircledC from "../../../../svg/circled-c"
import RightSplitState from "./RightSplitState"
import CopyrightSplitModel from "./CopyrightSplitModel"
import CopyrightForm from "../../../../pages/workpieces/right-splits/copyright"

export default class CopyrightSplit extends RightSplitState {
	constructor(parent, shareholdersColors) {
		super(parent, CircledC, shareholdersColors)
		this.domainState = new CopyrightSplitModel(this)
	}

	progress = (1 / 3) * 100
	form = CopyrightForm

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
				id: share.id,
				shares: share.shares,
				roles: share.roles,
				percent: percent,
				locked: share.locked || this.shares.length === 1,
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

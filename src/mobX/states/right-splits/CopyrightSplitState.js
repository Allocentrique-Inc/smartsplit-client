import { action, computed } from "mobx"
import CircledC from "../../../svg/circled-c"
import RightSplitState from "./RightSplitState"
import CopyrightSplitModel from "../../models/workpieces/right-splits/CopyrightSplitModel.js"
import CopyrightForm from "../../../pages/workpieces/right-splits/copyright"

export default class CopyrightSplitState extends RightSplitState {
	constructor(parent) {
		super(parent, CircledC)
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
	@computed get shareholdersData() {
		return this.shareholders.map((shareholder) => {
			let percent
			if (this.shareTotal > 0 && shareholder.shares) {
				percent = (100 * shareholder.shares) / this.shareTotal
			} else {
				percent = 0
			}
			return {
				id: shareholder.id,
				shares: shareholder.shares,
				roles: shareholder.roles,
				percent: percent,
				locked: shareholder.locked || this.shareholders.length === 1,
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

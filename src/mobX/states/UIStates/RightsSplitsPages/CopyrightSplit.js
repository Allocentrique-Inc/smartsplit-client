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
			return {
				id: share.shareHolderId,
				shares: share.shares,
				roles: share.roles,
				percent: share.shares > 0 ? (100 * share.shares) / this.sharesTotal : 0,
			}
		})
	}

	genChartProps(mode) {
		if (mode === "roles") {
			return {
				dataLeft: this.sharesToChartData(
					this.shares.filter((share) => share.roles.includes("author"))
				),
				dataRight: this.sharesToChartData(
					this.shares.filter(
						(share) =>
							share.roles.includes("composer") ||
							share.roles.includes("mixer") ||
							share.roles.includes("adapter")
					)
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

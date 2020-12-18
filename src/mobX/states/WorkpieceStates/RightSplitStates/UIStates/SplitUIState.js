import { action, computed, observable } from "mobx"
import { Metrics } from "../../../../../theme"
import { capValueWithinRange } from "../../../../../utils/utils"

export const CHART_MAX_SIZE = 384
export const CHART_WINDOW_RATIO = 0.45
/**
 *	Base class for splits UI
 *	states
 **/
export default class SplitUIState {
	constructor(rightSplit, logo, shareholderColors) {
		this.logo = logo
		this.rightSplit = rightSplit
		this.shareholderColors = shareholderColors
	}
	pageTitle
	progress
	logo
	@observable _chartSize = 0
	getStyles(windowWidth) {
		return {
			spacer:
				windowWidth >= 1200
					? {
							width: 3 * Metrics.spacing.group,
							height: 3 * Metrics.spacing.group,
					  }
					: {
							width: Metrics.spacing.group,
							height: Metrics.spacing.group,
					  },
			chart: {
				position: "sticky",
				top: Metrics.spacing.component,
			},
		}
	}

	sharesToChartData(shares = null) {
		shares = shares ? shares : this.shares
		return shares
			.filter((share) => share.shares)
			.map((share) => ({
				key: share.shareholderId,
				name: share.shareholderId,
				share: share.shares,
				color: this.shareholderColors.get(share.shareholderId),
			}))
	}

	genChartProps(shares = null) {
		return {
			data: this.sharesToChartData(shares),
			size: this.chartSize,
			logo: this.logo,
		}
	}

	set chartSize(size) {
		this._chartSize = capValueWithinRange(size, [0, CHART_MAX_SIZE])
	}

	@action init(pageTitle) {
		this.pageTitle = pageTitle
	}

	@computed get shares() {
		return this.rightSplit.domainState.sharesValues
	}

	@computed get shareTotal() {
		return this.rightSplit.domainState.shareTotal
	}

	@computed get chartSize() {
		return this._chartSize
	}
}

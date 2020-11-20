import { action, computed, observable } from "mobx"
import { Colors, Metrics } from "../../../../theme"
import { capValueWithinRange } from "../../../../utils/utils"

export const CHART_MAX_SIZE = 384
export const CHART_WINDOW_RATIO = 0.45
/**
 *	Base class for splits pages. Splits UI
 *	states derive from it
 **/
export default class SplitPageState {
	constructor(logo) {
		this.logo = logo
	}
	pageTitle
	progress
	logo
	shareColors = Object.values(Colors.secondaries)
	@observable domainState
	@observable _chartSize = 0
	colorByIndex(index) {
		return this.shareColors[index % this.shareColors.length]
	}

	getStyles(windowWidth) {
		return {
			spacer:
				windowWidth >= 1200
					? {
							width: 3 * Metrics.spacing.group,
							height: 3 * Metrics.spacing.group,
					  }
					: {
							width: Metrics.spacing.component,
							height: Metrics.spacing.component,
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
			.map((share, i) => ({
				key: share.shareholderId,
				name: share.shareholderId,
				share: share.shares,
				color: this.colorByIndex(i),
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

	@action init(domainState, pageTitle) {
		this.domainState = domainState
		this.pageTitle = pageTitle
	}

	@computed get shares() {
		return this.domainState.sharesValues
	}

	@computed get shareTotal() {
		return this.domainState.shareTotal
	}

	@computed get chartSize() {
		return this._chartSize
	}
}

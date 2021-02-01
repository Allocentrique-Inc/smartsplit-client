import { computed, observable } from "mobx"
import { Metrics } from "../../../theme"
import BaseModel from "../../BaseModel"
import { capValueWithinRange } from "../../../utils/utils"

export const CHART_MAX_SIZE = 384
export const CHART_WINDOW_RATIO = 0.45
/**
 *	Base class for split
 *	states. Has the responsibilities of a mobx UIState
 **/
export default class RightSplitState extends BaseModel {
	constructor(parent) {
		super(parent)
		this.shareholderColors = parent.shareholderColors
		this.shareholderNames = parent.shareholderNames
	}
	progress
	@observable _chartSize = 0
	@observable domainState
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

	sharesToChartData(shareholders) {
		return shareholders
			.filter((share) => share.shares)
			.map((share) => ({
				key: share.id,
				name: this.shareholderNames.get(share.id),
				share: share.shares,
				color: this.shareholderColors.get(share.id),
			}))
	}

	genChartProps(shareholders = this.shareholders) {
		return {
			data: this.sharesToChartData(shareholders),
			size: this.chartSize,
			logo: this.logo,
		}
	}

	set chartSize(size) {
		this._chartSize = capValueWithinRange(size, [0, CHART_MAX_SIZE])
	}

	@computed get shareholders() {
		return this.domainState.shareholdersValues
	}

	@computed get shareTotal() {
		return this.domainState.shareTotal
	}

	@computed get chartSize() {
		return this._chartSize
	}
}

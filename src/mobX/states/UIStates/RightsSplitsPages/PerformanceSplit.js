import CircledStar from "../../../../svg/circled-star"
import { computed } from "mobx"
import SplitPageState from "./SplitPageState"
import PerformanceForm from "../../../../pages/workpieces/rights-splits/performance"
import { Colors, Metrics } from "../../../../theme"

/**
 *  Performance form page UI state
 **/
export default class PerformanceSplit extends SplitPageState {
	constructor() {
		super(CircledStar)
	}
	progress = (2 / 3) * 100
	form = PerformanceForm
	@computed get sharesData() {
		return this.shares.map((share) => {
			const shareQty =
				this.domainState.majorShares.length +
				this.domainState.minorShares.length
			let percent
			if (shareQty && share.shares) {
				percent = (100 * share.shares) / shareQty
			} else {
				percent = 0
			}
			return {
				id: share.shareholderId,
				shares: share.shares,
				roles: share.roles,
				status: share.status,
				percent: percent,
			}
		})
	}

	getStyles(windowWidth) {
		return {
			...super.getStyles(windowWidth),
			checkboxesContainer: {
				borderLeftWidth: 2,
				borderLeftColor: Colors.stroke,
				paddingLeft: Metrics.spacing.component,
			},
			selectFrame: {
				backgroundColor: Colors.primary_reversed,
			},
		}
	}

	genChartProps() {
		return super.genChartProps([
			...this.domainState.majorShares,
			...this.domainState.minorShares,
		])
	}
}

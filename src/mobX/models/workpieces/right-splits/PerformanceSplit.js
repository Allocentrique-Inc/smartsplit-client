import CircledStar from "../../../../svg/circled-star"
import { computed } from "mobx"
import RightSplitState from "./RightSplitState"
import PerformanceSplitModel from "./PerformanceSplitModel"
import { Colors, Metrics } from "../../../../theme"
import PerformanceForm from "../../../../pages/workpieces/right-splits/performance"

export default class PerformanceSplit extends RightSplitState {
	constructor(parent, shareholderColors) {
		super(parent, CircledStar, shareholderColors)
		this.domainState = new PerformanceSplitModel(this)
	}
	progress = (2 / 3) * 100
	form = PerformanceForm
	@computed get sharesData() {
		const sharesData = []
		const seenShareholders = []
		const shareQty =
			this.domainState.majorShares.length + this.domainState.minorShares.length
		function extractShareData(share) {
			let percent
			if (shareQty > 0 && share.shares) {
				percent = (100 * share.shares) / shareQty
			} else {
				percent = 0
			}
			return {
				id: share.id,
				shares: share.shares,
				roles: share.roles,
				status: share.status,
				percent: percent,
			}
		}
		this.domainState.majorShares.forEach((share) => {
			sharesData.push(extractShareData(share))
			seenShareholders.push(share.id)
		})
		this.domainState.minorShares.forEach((share) => {
			sharesData.push(extractShareData(share))
			seenShareholders.push(share.id)
		})
		this.shares.forEach((share) => {
			if (!seenShareholders.includes(share.id)) {
				sharesData.push(extractShareData(share))
			}
		})
		return sharesData
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

import CircledStar from "../../../svg/circled-star"
import { computed } from "mobx"
import RightSplitState from "./RightSplitState"
import PerformanceSplitModel from "../../models/workpieces/right-splits/PerformanceSplitModel"
import { Colors, Metrics } from "../../../theme"
import PerformanceForm from "../../../pages/workpieces/right-splits/performance"

export default class PerformanceSplitState extends RightSplitState {
	constructor(parent) {
		super(parent, CircledStar)
		this.domainState = new PerformanceSplitModel(this)
	}
	progress = (2 / 3) * 100
	form = PerformanceForm
	@computed get shareholdersData() {
		const sharesData = []
		const seenShareholders = []
		const shareQty =
			this.domainState.majorShares.length + this.domainState.minorShares.length
		function extractShareholderData(shareholder) {
			let percent
			if (shareQty > 0 && shareholder.shares) {
				percent = (100 * shareholder.shares) / shareQty
			} else {
				percent = 0
			}
			return {
				id: shareholder.id,
				shares: shareholder.shares,
				roles: shareholder.roles,
				status: shareholder.status,
				percent: percent,
			}
		}
		this.domainState.majorShares.forEach((shareholder) => {
			sharesData.push(extractShareholderData(shareholder))
			seenShareholders.push(shareholder.id)
		})
		this.domainState.minorShares.forEach((shareholder) => {
			sharesData.push(extractShareholderData(shareholder))
			seenShareholders.push(shareholder.id)
		})
		this.shareholders.forEach((shareholder) => {
			if (!seenShareholders.includes(shareholder.id)) {
				sharesData.push(extractShareholderData(shareholder))
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

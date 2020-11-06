import CircledStar from "../../../../svg/circled-star"
import { computed } from "mobx"
import SplitPageState from "./SplitPageState"
import PerformanceForm from "../../../../pages/workpieces/rights-splits/performance"

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
			const sharesQty =
				this.domainState.majorShares.length +
				this.domainState.minorShares.length
			return {
				id: share.shareHolderId,
				shares: share.shares,
				roles: share.roles,
				status: share.status,
				percent: share.shares > 0 ? (100 * share.shares) / sharesQty : 0,
			}
		})
	}

	genChartProps() {
		return super.genChartProps([
			...this.domainState.majorShares,
			...this.domainState.minorShares,
		])
	}
}

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
			return {
				id: share.shareHolderId,
				shares: share.shares,
				roles: share.roles,
				status: share.status,
				percent: share.shares > 0 ? (100 * share.shares) / this.sharesTotal : 0,
			}
		})
	}
}

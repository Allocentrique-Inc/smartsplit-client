import CircledP from "../../../../svg/circled-p"
import SplitPageState from "./SplitPageState"
import RecordingForm from "../../../../pages/workpieces/rights-splits/recording"
import { computed } from "mobx"
import { Colors } from "../../../../theme"

/**
 *  Recording form page UI state
 **/
export default class RecordingSplit extends SplitPageState {
	constructor() {
		super(CircledP)
	}
	progress = (10 / 11) * 100
	form = RecordingForm

	@computed get sharesData() {
		return this.shares.map((share) => {
			let percent
			if (this.shareTotal > 0 && share.shares) {
				percent = (100 * share.shares) / this.shareTotal
			} else {
				percent = 0
			}
			return {
				id: share.shareholderId,
				shares: share.shares,
				function: share.function,
				percent: percent,
				locked: share.locked || this.shares.length === 1,
			}
		})
	}

	getStyles(windowWidth) {
		return {
			...super.getStyles(windowWidth),
			selectFrame: {
				backgroundColor: Colors.primary_reversed,
			},
		}
	}
}

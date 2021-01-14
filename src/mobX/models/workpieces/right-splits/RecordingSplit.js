import CircledP from "../../../../svg/circled-p"
import RightSplitState from "./RightSplitState"
import { computed } from "mobx"
import RecordingSplitModel from "./RecordingSplitModel"
import RecordingForm from "../../../../pages/workpieces/right-splits/recording"
import { Colors } from "../../../../theme"

export default class RecordingSplit extends RightSplitState {
	constructor(parent, shareholderColors) {
		super(parent, CircledP, shareholderColors)
		this.domainState = new RecordingSplitModel(this)
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
				id: share.id,
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

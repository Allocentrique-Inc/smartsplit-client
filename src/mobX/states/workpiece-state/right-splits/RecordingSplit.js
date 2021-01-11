import CircledP from "../../../../svg/circled-p"
import RightSplitState from "./RightSplitState"

import { computed } from "mobx"
import { Colors } from "../../../../theme"
import RecordingForm from "../../../../pages/workpieces/right-splits/recording"
import RecordingSplitModel from "../../../models/workpieces/right-splits/RecordingSplitModel"

export default class RecordingSplit extends RightSplitState {
	constructor(domainState, shareholderColors) {
		super(new RecordingSplitModel(), CircledP, shareholderColors)
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

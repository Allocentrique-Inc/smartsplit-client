import CircledP from "../../../svg/circled-p"
import RightSplitState from "./RightSplitState"
import { computed } from "mobx"
import RecordingSplitModel from "../../models/workpieces/right-splits/RecordingSplitModel"
import RecordingForm from "../../../pages/workpieces/right-splits/recording"
import { Colors } from "../../../theme"
import i18next from "i18next"

export default class RecordingSplitState extends RightSplitState {
	constructor(parent) {
		super(parent)
		this.domainState = new RecordingSplitModel(this)
	}
	progress = (10 / 11) * 100
	form = RecordingForm
	logo = CircledP
	pageTitle = i18next.t("rightSplits:recording.title")

	@computed get disabledLockButton() {
		return (
			this.shareholders.filter((shareholder) => shareholder.shares).length === 1
		)
	}

	@computed get shareholdersData() {
		return this.shareholders.map((shareholder) => {
			let percent
			if (this.shareTotal > 0 && shareholder.shares) {
				percent = (100 * shareholder.shares) / this.shareTotal
			} else {
				percent = 0
			}
			return {
				id: shareholder.id,
				shares: shareholder.shares,
				function: shareholder.function,
				percent: percent,
				locked: shareholder.locked,
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

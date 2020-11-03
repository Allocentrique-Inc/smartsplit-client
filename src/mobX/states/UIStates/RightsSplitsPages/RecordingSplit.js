import CircledP from "../../../../svg/circled-p"
import SplitPageState from "./SplitPageState"
import RecordingForm from "../../../../pages/workpieces/rights-splits/recording"

/**
 *  Recording form page UI state
 **/
export default class RecordingSplit extends SplitPageState {
	constructor() {
		super(CircledP)
	}
	progress = (10 / 11) * 100
	form = RecordingForm
}

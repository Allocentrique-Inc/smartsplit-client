import SplitDomainState from "./SplitDomainState"
import RecordingSplitModel, {
	initData,
} from "../../../../models/workpieces/rights-splits/RecordingSplitModel"
import { action, observable } from "mobx"

/**
 *	Recording split domain state derived from SplitDomainState.
 **/
export default class RecordingSplit extends SplitDomainState {
	constructor(rightSplit, shares) {
		super(rightSplit, shares, RecordingSplitModel, initData)
	}
	functionValues = [
		"producer",
		"autoProducer",
		"directorProducer",
		"techProducer",
		"studio",
		"illustratorDesigner",
	]
	@observable mode = "equal"
	@action setShareFunction(id, value) {
		this.updateShareField(id, "function", value)
		this.updateShareField(id, "shares", 1)
	}

	/**
	 *	Action that toggles lock state of the share with the provided id.
	 *	Detect if the action is a lock or an unlock action. In the first case,
	 *	if there is only one share unlocked, the action locks it too to prevent the
	 * 	user from manually modifying it. Otherwise it would provoke a UI bug, the
	 *	corresponding slider UI would react without making change to the actual shares.
	 **/
	@action toggleShareLock(id) {
		const share = this.shareholders.get(id)
		if (share.locked) {
			const otherShares = this.sharesValues.filter(
				(share) => share.shareholderId !== id && share.locked
			)
			otherShares.forEach(
				(share) => (this.shareholders.get(share.shareholderId).locked = false)
			)
		} else {
			const otherShares = this.sharesValues.filter(
				(share) => share.shares && share.shareholderId !== id && !share.locked
			)
			if (otherShares.length === 1) {
				this.shareholders.get(otherShares[0].shareholderId).locked = true
			}
		}
		this.shareholders.get(id).locked = !share.locked
	}
}

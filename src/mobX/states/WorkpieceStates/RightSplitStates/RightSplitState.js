export default class RightSplitState {
	constructor(shares, domainState, UIState, shareholderColors) {
		this.domainState = new domainState(this, shares)
		this.UIState = new UIState(this, shareholderColors)
	}
}

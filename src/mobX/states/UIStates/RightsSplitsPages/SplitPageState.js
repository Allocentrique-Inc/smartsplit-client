import { action, computed, observable } from "mobx"
import { Colors } from "../../../../theme";

/**
 *	Base class for splits pages. Splits UI
 *	states derive from it
 **/
export default class SplitPageState {
	/**
	*	Action to initialize the ui state. Shares are an array
	*	of shareholders stripped values from their observables
	*	Split page states can't be initialized upon RootStore 
	*	creation like other stores because a workpiece has not 
	*	been selected yet by the user
	**/
	@action init(pageTitle, shares) {
		this.shares = shares
		this.pageTitle = pageTitle
	}

	constructor(logo) {
		this.logo = logo
	}


	pageTitle
	progress
	logo 
	@observable chartSize = 0
	@observable shares
	
	@computed get sharesTotal() {
		return this.shares.map((share) => share.shares).reduce((a, n) => a + n, 0)
	}

	shareColors = Object.values(Colors.secondaries)

	colorByIndex(index) {
	return this.shareColors[index % this.shareColors.length]
	}

	sharesToChartData() {
		return this.shares.map((share, i) => ({
			key: share.shareHolderId,
			name: share.shareHolderId,
			share: share.shares,
			color: this.colorByIndex(i),
		}))
	}

	genChartProps() {
		return {
			data: this.sharesToChartData(),
			size: this.chartSize,
			logo: this.logo
		}
	}
}
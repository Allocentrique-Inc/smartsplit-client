import { action, computed, observable } from "mobx"
import { Colors } from "../../../../theme"

/**
 *	Base class for splits pages. Splits UI
 *	states derive from it
 **/
export default class SplitPageState {
	@action init(domainState, pageTitle) {
		this.domainState = domainState
		this.pageTitle = pageTitle
	}

	constructor(logo) {
		this.logo = logo
	}
	@observable domainState
	pageTitle
	progress
	logo
	@observable chartSize = 0
	@computed get shares() {
		return this.domainState.sharesValues
	}

	shareColors = Object.values(Colors.secondaries)

	colorByIndex(index) {
		return this.shareColors[index % this.shareColors.length]
	}

	sharesToChartData(shares = null) {
		shares = shares ? shares : this.shares
		return shares.map((share, i) => ({
			key: share.shareHolderId,
			name: share.shareHolderId,
			share: share.shares,
			color: this.colorByIndex(i),
		}))
	}

	genChartProps(shares = null) {
		return {
			data: this.sharesToChartData(shares),
			size: this.chartSize,
			logo: this.logo,
		}
	}

	@computed get sharesTotal() {
		return this.shares.length
	}
}

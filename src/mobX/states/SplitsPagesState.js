import BaseState from "../BaseState"
import { observable, computed, action } from "mobx"
import { Colors } from "../../theme"
import CircledC from "../../svg/circled-c"

export default class SplitsPagesState extends BaseState {
	copyright = new CopyrightState()
}

class CopyrightState {
	@action init(titleLeft, titleRight, shares) {
		this.titleLeft = titleLeft
		this.titleRight = titleRight
		this.shares = shares
	}

	logo = CircledC
	@observable chartSize = 0
	@observable shares

	@computed get sharesTotal() {
		return this.shares.map((share) => share.shares).reduce((a, n) => a + n, 0)
	}

	@computed get sharesData() {
		return this.shares.map((share) => {
			return {
				id: share.shareHolderId,
				shares: share.shares,
				roles: share.roles,
				percent: share.shares > 0 ? (100 * share.shares) / this.sharesTotal : 0,
			}
		})
	}

	genChartProps(mode) {
		if (mode === "roles") {
			return {
				dataLeft: sharesToChartData(
					this.shares.filter((share) => share.roles.includes("author"))
				),
				dataRight: sharesToChartData(
					this.shares.filter(
						(share) =>
							share.roles.includes("composer") ||
							share.roles.includes("mixer") ||
							share.roles.includes("adapter")
					)
				),
				size: this.chartSize,
				logo: this.logo,
				titleLeft: this.titleLeft,
				titleRight: this.titleRight,
			}
		} else {
			return {
				data: sharesToChartData(this.shares),
				size: this.chartSize,
				logo: this.logo,
			}
		}
	}
}

const shareColors = Object.values(Colors.secondaries)

export function colorByIndex(index) {
	return shareColors[index % shareColors.length]
}

export function sharesToChartData(shares) {
	return shares.map((share, i) => ({
		key: share.shareHolderId,
		name: share.shareHolderId,
		share: share.shares,
		color: colorByIndex(i),
	}))
}

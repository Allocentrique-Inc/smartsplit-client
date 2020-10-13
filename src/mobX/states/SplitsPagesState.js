import BaseState from "../BaseState"
import { observable, computed, action, reaction } from "mobx"
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

		/**
		 * reaction that performs roles checking upon
		 * mode change to or from equal
		 */
		reaction(
			() => this.mode,
			(mode) => {
				if (mode === "equal" && !this.equalModeInitiated) {
					this.initEqualMode()
				} else {
					this.equalModeInitiated = false
				}
			},
			{ fireImmediately: true }
		)

		/**
		 * Reaction that resets this.equalModeInitiated when
		 * adding or removing a shareholder
		 */
		reaction(
			() => this.shares,
			() => {
				this.equalModeInitiated = false
			}
		)
	}

	@observable equalModeInitiated = false
	logo = CircledC
	@observable mode = "equal"
	@observable chartSize = 0
	@observable shares
	@action setValue(key, value) {
		this[key] = value
	}

	@action initEqualMode() {
		this.equalModeInitiated = true
		this.shares.forEach((share) => {
			!share.roles.includes("author") && share.roles.push("author")
			!share.roles.includes("composer") && share.roles.push("composer")
		})
	}

	@action updateShare(index, value) {
		const diff = value - this.shares[index].toJS().shares
		console.log("DIFFF", diff)
		this.shares.forEach((share, i) => {
			if (i === index) {
				share.setValue(value)
			} else {
				share.setValue(share.toJS().shares - diff)
			}
		})
	}

	@computed get sharesPercents() {
		return new Map(
			this.shares.map((share) => [
				share.shareHolderId,
				share.shares.value > 0
					? (100 * share.shares.value) / this.sharesTotal
					: 0,
			])
		)
	}

	@computed get sharesTotal() {
		return this.shares
			.map((share) => share.toJS().shares)
			.reduce((a, n) => a + n, 0)
	}

	@computed get chartProps() {
		if (this.mode === "roles") {
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
		share: share.toJS().shares,
		color: colorByIndex(i),
	}))
}

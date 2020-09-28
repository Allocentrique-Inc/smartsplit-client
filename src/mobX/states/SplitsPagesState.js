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
		 * reaction that perform roles checking upon
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
		 * Reaction that reset this.equalModeInitiated when
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

	@computed get sharesValues() {
		return this.shares.map((share) => share.toJS())
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

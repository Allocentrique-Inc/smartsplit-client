import { action, observable, reaction } from "mobx"
import {
	createNewRightsSplits,
	updateRightsSplits,
} from "../../../../api/workpieces"
import { $workpiece } from "../WorkpieceState"
import RightSplitState from "./RightSplitStates/RightSplitState"
import {
	CopyrightSplit as CopyrightUI,
	PerformanceSplit as PerformanceUI,
	RecordingSplit as RecordingUI,
} from "./RightSplitStates/UIStates"
import {
	CopyrightSplit,
	PerformanceSplit,
	RecordingSplit,
} from "./RightSplitStates/DomainStates"
import { Colors } from "../../../theme"
import { lightenDarkenColor } from "../../../utils/utils"

/**
 *	Class managing the 3 splits (copyright, performance, recording)
 **/
export default class RightsSplits {
	constructor(rightsSplits = {}) {
		this.copyright = new RightSplitState(
			rightsSplits.copyright,
			CopyrightSplit,
			CopyrightUI,
			this.shareholderColors
		)
		this.performance = new RightSplitState(
			rightsSplits.performance,
			PerformanceSplit,
			PerformanceUI,
			this.shareholderColors
		)
		this.recording = new RightSplitState(
			rightsSplits.performance,
			RecordingSplit,
			RecordingUI,
			this.shareholderColors
		)
		Object.defineProperties(this, {
			state: {
				configurable: true,
				enumerable: false,
				writable: true,
				value: rightsSplits._state,
			},
			hasChanged: {
				configurable: true,
				enumerable: false,
				writable: true,
				value: false,
			},
		})

		reaction(
			() => [
				...this.copyright.domainState.shareholders.keys(),
				...this.performance.domainState.shareholders.keys(),
				...this.recording.domainState.shareholders.keys(),
			],
			(ids) => {
				const uniqueIds = []
				ids.forEach((id) => {
					if (uniqueIds.indexOf(id) === -1) {
						uniqueIds.push(id)
					}
				})

				// Check for shareholder removed from every right splits then update
				// shareholderColors and availableColors accordingly
				for (const id in this.shareholderColors.keys()) {
					if (uniqueIds.indexOf(id) === -1) {
						this.availableColors.push(this.shareholderColors.get(id))
						this.shareholderColors.delete(id)
					}
				}

				// Check for new shareholder and assign him an available color
				uniqueIds.forEach((id) => {
					if (!this.shareholderColors.has(id)) {
						this.availableColors.length === 0 && this.replenishColors()
						this.shareholderColors.set(id, this.availableColors.shift())
					}
				})
			},
			{ fireImmediately: true }
		)
	}

	// Map <shareholderId, Color(hex)> that holds unique pairs of shareholder
	// Id and color
	@observable shareholderColors = new Map()

	// Pool of available colors, i.e. color not already assignated to a shareholder ID
	availableColors = Object.values(Colors.secondaries)

	// When there is no more color available, add a new full set of colors into the pool based
	// on Colors secondaries on which a lightening transformation is applied
	replenishCounter = 1
	replenishColors() {
		this.availableColors = Object.values(Colors.secondaries).map((color) =>
			lightenDarkenColor(color, this.replenishCounter * 10)
		)
		++this.replenishCounter
	}
	exportRightsSplits() {
		const output = {}
		Object.keys(this).forEach((type) => {
			output[type] = this[type].allShares
			Object.assign(output, { type: this[type].allShares })
		})
		return output
	}

	@action
	async save() {
		if (!this.$hasChanged) return

		try {
			this.$hasChanged = false
			this.$error = null
			let newState
			if (this._state === "draft") {
				newState = await updateRightsSplits(
					this[$workpiece].id,
					this._exportRightsSplits()
				)
			} else {
				newState = await createNewRightsSplits(
					this[$workpiece].id,
					this._exportRightsSplits()
				)
			}

			this._updateRightsSplits(newState)
		} catch (e) {
			this.$hasChanged = true
			this.$error = e
			throw e
		}
	}
}

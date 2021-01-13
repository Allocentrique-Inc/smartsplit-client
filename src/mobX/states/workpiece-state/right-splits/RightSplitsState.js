import { observable, reaction } from "mobx"
import CopyrightSplit from "./CopyrightSplit"
import PerformanceSplit from "./PerformanceSplit"
import RecordingSplit from "./RecordingSplit"
import { Colors } from "../../../../theme"
import { lightenDarkenColor } from "../../../../utils/utils"

/**
 *	Contains the 3 right split states (copyright, performance, recording). Manage a list of unique sets of shareholderId - color, which is used in the split pages. Save in and load split
 models from the backend
 **/
export default class RightSplitsState {
	constructor(workpiece) {
		this.workpiece = workpiece
		this.copyright = new CopyrightSplit(
			this.workpiece.rightSplits.copyright,
			this.shareholderColors
		)
		this.performance = new PerformanceSplit(
			this.workpiece.rightSplits.performance,
			this.shareholderColors
		)
		this.recording = new RecordingSplit(
			this.workpiece.rightSplits.recording,
			this.shareholderColors
		)
		reaction(
			() => [
				...this.copyright.domainState.shareholders.array.map(
					(share) => share.shareholderId
				),
				...this.performance.domainState.shareholders.array.map(
					(share) => share.shareholderId
				),
				...this.recording.domainState.shareholders.array.map(
					(share) => share.shareholderId
				),
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
	@observable workpiece
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
}

import { observable, reaction } from "mobx"
import CopyrightSplit from "./CopyrightSplit"
import PerformanceSplit from "./PerformanceSplit"
import RecordingSplit from "./RecordingSplit"
import { Colors } from "../../../../theme"
import {
	createRightSplits,
	updateRightSplits,
} from "../../../../../api/workpieces"
import { lightenDarkenColor } from "../../../../utils/utils"
import BaseModel from "../../../BaseModel"

/**
 *	Contains the 3 right split states (copyright, performance, recording). Manage a list of unique sets of shareholder ID - color, which is used in the split pages. Save in and load split
 models from the backend
 **/
export default class RightSplitsState extends BaseModel {
	constructor(workpiece) {
		super()
		this.workpieceId = workpiece.id
		this.copyright = new CopyrightSplit(this, this.shareholderColors)
		this.performance = new PerformanceSplit(this, this.shareholderColors)
		this.recording = new RecordingSplit(this, this.shareholderColors)
		reaction(
			() => [
				...this.copyright.domainState.sharesValues.map((share) => share.id),
				...this.performance.domainState.sharesValues.map((share) => share.id),
				...this.recording.domainState.sharesValues.map((share) => share.id),
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

	// Map <shareholder ID, Color(hex)> that holds unique pairs of shareholder
	// Id and color
	@observable shareholderColors = new Map()
	@observable copyright
	@observable performance
	@observable recording
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

	save() {
		const data = this.toJSON()
		console.log("DEBUG DATA TO SEND", data, this.children)
		try {
			let response
			if (this.isNew) {
				response = createRightSplits(this.workpieceId, data)
			} else {
				response = updateRightSplits(this.workpieceId, data)
			}
			console.log(response)
		} catch (e) {
			console.error(e)
		}
		console.log("DEBUG SAVE", this.isDirty)
	}
}

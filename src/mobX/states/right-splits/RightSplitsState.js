import { observable, reaction } from "mobx"
import CopyrightSplitState from "./CopyrightSplitState"
import PerformanceSplitState from "./PerformanceSplitState"
import RecordingSplitState from "./RecordingSplitState"
import { Colors } from "../../../theme"
import {
	createRightSplits,
	updateRightSplits,
} from "../../../../api/workpieces"
import { lightenDarkenColor } from "../../../utils/utils"
import BaseModel from "../../BaseModel"

/**
 *	Contains the 3 right split states (copyright, performance, recording). Manage a list of unique sets of shareholder ID - color, which is used in the split pages. Save in and load split
 models from the backend
 **/
export default class RightSplitsState extends BaseModel {
	constructor(workpiece) {
		super()
		this.workpieceId = workpiece.id
		this.copyright = new CopyrightSplitState(this)
		this.performance = new PerformanceSplitState(this)
		this.recording = new RecordingSplitState(this)
		reaction(
			() => [
				...this.copyright.shareholders.map((shareholder) => shareholder.id),
				...this.performance.shareholders.map((shareholder) => shareholder.id),
				...this.recording.shareholders.map((shareholder) => shareholder.id),
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
	@observable _state = "draft"
	// Pool of available colors, i.e. color not already assignated to a shareholder ID
	availableColors = Object.values(Colors.secondaries)

	// When there is no more color available, add a new full set of colors into the pool based
	// on Colors secondaries, on which a lightening transformation is applied
	replenishCounter = 1
	replenishColors() {
		this.availableColors = Object.values(Colors.secondaries).map((color) =>
			lightenDarkenColor(color, this.replenishCounter * 10)
		)
		++this.replenishCounter
	}

	async save() {
		const data = this.toJS()
		const body = {
			_state: this._state,
			copyright: data.copyright.domainState.shareholders,
			performance: data.performance.domainState.shareholders,
			recording: data.recording.domainState.shareholders,
		}
		try {
			let response
			if (this.isNew) {
				response = await createRightSplits(this.workpieceId, body)
			} else {
				response = await updateRightSplits(this.workpieceId, body)
			}
			console.log("RESPONSE SPLIT SAVING", response)
		} catch (e) {
			console.error(e)
		}
	}
}

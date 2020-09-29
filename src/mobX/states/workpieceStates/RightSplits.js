import { action, computed, decorate, observable } from "mobx"
import {
	createNewRightsSplits,
	updateRightsSplits,
} from "../../../../api/workpieces"
import { $workpiece } from "../WorkpieceState"
import SplitCopyrightModel from "../../models/workpieces/rights-splits/SplitCopyrightModel"
import SplitPerformanceModel from "../../models/workpieces/rights-splits/SplitPerformanceModel"
import SplitRecordingModel from "../../models/workpieces/rights-splits/SplitRecordingModel"

export default class RightsSplits {
	constructor(workpiece, rightsSplits = {}) {
		this.$workpiece = workpiece
		this.copyright = new RightSplit(rightsSplits.copyright, SplitCopyrightModel)
		this.performance = new RightSplit(
			rightsSplits.performance,
			SplitPerformanceModel
		)
		this.recording = new RightSplit(rightsSplits.recording, SplitRecordingModel)
		Object.defineProperties(this, {
			_state: {
				configurable: true,
				enumerable: false,
				writable: true,
				value: rightsSplits._state,
			},
			$hasChanged: {
				configurable: true,
				enumerable: false,
				writable: true,
				value: false,
			},
			$error: {
				configurable: false,
				enumerable: false,
				writable: true,
				value: null,
			},
			_disposers: {
				configurable: false,
				enumerable: false,
				writable: true,
				value: null,
			},
		})
		decorate(this, {
			copyright: observable,
			performance: observable,
			recording: observable,
			_state: observable,
			$hasChanged: observable,
		})
		this._disposers = [
			this.copyright.shareHolders.observe(this._toggleHasChanged),
			this.copyright.shareHolders.observe(this._toggleHasChanged),
			this.copyright.shareHolders.observe(this._toggleHasChanged),
		]
	}

	@action _toggleHasChanged() {
		this.$hasChanged = true
	}

	@action _updateRightsSplits(rightsSplits) {
		const { _state, ...splits } = rightsSplits
		splits.keys().forEach((type) => {
			if (type in this && this[type].updateShares) {
				this[type].updateShares(splits[type])
			}
		})
		this._state = _state
		this.$hasChanged = false
	}

	_exportRightsSplits() {
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

export class RightSplit {
	constructor(shares, shareModel) {
		this.shareModel = shareModel
		if (shares) this.updateShares(shares)
	}

	@observable shareHolders = new Map()

	@action removeRightHolder(id) {
		this.shareHolders.delete(id)
	}

	@action updateRightHolder(id, share) {
		!share && this.shareHolders.get(id).reset()
		!!share && this.shareHolders.get(id).setFields(share)
	}

	@action addRightHolder(id, share = null) {
		if (this.shareHolders.has(id)) {
			throw new Error("Cannot add share: this user already has a share")
		}
		const newShare = new this.shareModel()
		console.log("INIT SHARE", share)
		newShare.init(share)
		this.shareHolders.set(id, newShare)
	}

	addShare(share) {
		return this.addRightHolder(share.rightHolder, share)
	}

	updateShare(share) {
		return this.updateRightHolder(share.rightHolder, share)
	}

	removeShare(share) {
		return this.removeRightHolder(share.rightHolder)
	}

	@action updateShares(shares) {
		const seenShareHolders = []
		shares.forEach((share) => {
			seenShareHolders.push(share.rightHolder)
			if (this.shareHolders.has(share.rightHolder)) {
				this.updateShare(share)
			} else {
				this.addShare(share)
			}
		})
		this.shareHolders.forEach(
			(value, key) =>
				seenShareHolders.indexOf(key) < 0 && this.removeRightHolder(key)
		)
	}

	@computed get allShares() {
		return Array.from(this.shareHolders.values())
	}
}

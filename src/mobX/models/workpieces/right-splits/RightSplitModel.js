import { action, computed, observable, reaction } from "mobx"
import BaseModel, { ModelCollection } from "../../../BaseModel"

/**
 *	Base class for right split domain states managing shareholders. Right splits derive from it
 **/
export default class RightSplitModel extends BaseModel {
	@observable shareholders
	constructor(parent, modelClass, initShareData) {
		super(parent)
		this.shareholders = new ModelCollection(this, "shareholders", {
			modelClass,
		})
		this.initShareData = initShareData
	}

	/**
	 *	Provides a data structure that makes easier
	 *	to access and use share field values.
	 * 	(hence shareholderS valueS, because each shareholder has
	 *	multiple Field attributes)
	 * 	@return: Array<{Field.value}>
	 **/
	@computed get shareholdersValues() {
		return this.shareholders.toJS(false, false).map((share) => {
			const { rightHolder, ...rest } = share
			return { id: rightHolder, ...rest }
		})
	}

	init(data) {
		if (this.type === "copyright" || this.type === "recording") {
			reaction(
				() =>
					this.shareholdersValues.map((shareholder) => ({
						id: shareholder.id,
						shares: shareholder.shares,
						locked: shareholder.locked,
					})),
				(shareholders) => {
					const unlocked = shareholders.filter(
						(shareholder) => !shareholder.locked
					)
					if (unlocked.length === 1) {
						this.updateShareholderField(unlocked[0].id, "locked", true)
					}
				},
				{ fireImmediately: true }
			)
		}
		super.init(data)
	}

	@computed get shareTotal() {
		return this.shareholdersValues.reduce((n, current) => n + current.shares, 0)
	}

	@action addShareholder(rightHolder, shareData = this.initShareData) {
		if (this.includes(rightHolder)) {
			console.error(`Error adding shareholder: id found`)
			return
		}
		this.shareholders.add({ rightHolder, ...shareData })
	}

	@action removeShareholder(id) {
		if (!this.includes(id)) {
			throw new Error("Error: provided id not found")
		}
		this.shareholders.remove(this.indexOf(id))
	}

	/**
	 *	Allows you to update the value of one of the observable Fields of a
	 *	a shareholder directly from the UI
	 **/
	@action updateShareholderField(id, field, value) {
		if (!this.includes(id)) {
			throw new Error("Error: provided id not found")
		}

		this.get(id).setValue(field, value)
	}

	includes(id) {
		return this.shareholdersValues.some((share) => share.id === id)
	}

	indexOf(id) {
		return this.shareholdersValues.findIndex((share) => share.id === id)
	}

	get(id) {
		return this.shareholders.array.find(
			(share) => share.rightHolder.value === id
		)
	}

	/**
	 * Add diff to every share values.
	 * @param diff: float
	 * @param shares: Array<ShareModel>
	 */
	@action applyDiffToShares(diff, shareholders) {
		shareholders.forEach((shareholder) => {
			const newValue = this.get(shareholder.id).shares.value + diff
			this.updateShareholderField(shareholder.id, "shares", newValue)
		})
	}

	/**
	 *	Update all shares if no shares array are provided.
	 *	args:
	 *	- Array<ShareValues>: ShareValues must
	 *	be an object with a valid shareholder key
	 *	- value: Value to update shares with. Default
	 *	to 1
	 **/
	@action setShares(shares = this.shareholdersValues, value = 1) {
		shares.forEach((share) => {
			this.updateShareholderField(share.id, "shares", value)
		})
	}

	/**
	 *	Update shareholder shares with provided id and value. Then
	 *	update the other shareholders shares on an inverse pro rata basis
	 **/
	@action updateProratedShares(id, value) {
		function computeOtherShareholders(shareholders) {
			return shareholders
				.filter(
					(shareholder) =>
						shareholder.id !== id &&
						typeof shareholder.shares === "number" &&
						!shareholder.locked
				)
				.sort((a, b) => a.shares - b.shares)
		}

		if (!this.includes(id)) {
			throw new Error(
				`Error in updateProratedShares: share holder ${id} not found`
			)
		}
		// console.log("DEBUG VALUE PRORATA", value, id)
		// Difference between actual share and value to apply
		// console.log("UPDATE SHARE", this.shareholders.get(id))
		const oldValue = this.get(id).shares.value
		const diff = value - oldValue
		if (diff === 0) return
		// If diff < 0, we subtract a portion from the shareholder and then
		// splitting it between other shareholders
		if (diff < 0) {
			const otherShareholders = computeOtherShareholders(
				this.shareholdersValues
			)
			this.applyDiffToShares(
				-diff / otherShareholders.length,
				otherShareholders
			)
		} else {
			//	Algorithm that splits as equally as possible the
			//	difference (value - shareholder shares)
			//	Difference is equally subtracted to other shares as
			//	long as the current smallest share > 0, and so on
			//	until difference = 0
			let toSplit = diff
			while (toSplit > 0) {
				// 1. Filter shares equal to 0
				const otherShareholders = computeOtherShareholders(
					this.shareholdersValues
				).filter((shareholder) => shareholder.shares > 0)
				// console.log("sorted non-zero shares", otherShareholders)
				// 2. Select smallest non-zero share
				let smallestShare = otherShareholders[0]
				// console.log("SMALLEST SHARE", smallestShare)

				// 3. Try an equal split of toSplit
				toSplit = toSplit - otherShareholders.length * smallestShare.shares

				if (toSplit > 0) {
					this.applyDiffToShares(-smallestShare.shares, otherShareholders)
				} else {
					this.applyDiffToShares(
						-(smallestShare.shares + toSplit / otherShareholders.length),
						otherShareholders
					)
				}
			}
		}

		this.updateShareholderField(id, "shares", value)
	}

	/**
	 *	Action that toggles lock state of the share with the provided id.
	 *	Detect if the action is a locking or an unlocking. In the first case,
	 *	if there is only one other share unlocked left, the action locks this one too to prevent the
	 * 	user from manually modifying it. Otherwise it would provoke a UI bug, the
	 *	corresponding slider UI would react without making change to the actual shares.
	 **/
	@action toggleShareLock(id) {
		const index = this.indexOf(id)
		if (index === -1) {
			console.error(`Error in toggleShareLock: share holder ${id} not found`)
		}
		const share = this.shareholdersValues[index]
		if (share.locked) {
			const otherShares = this.shareholdersValues.filter(
				(share) => share.id !== id && share.locked
			)
			otherShares.forEach((share) =>
				this.updateShareholderField(share.id, "locked", false)
			)
		} else {
			const otherShares = this.shareholdersValues.filter(
				(share) => share.id !== id && !share.locked
			)
			if (otherShares.length === 1) {
				this.updateShareholderField(otherShares[0].id, "locked", true)
			}
		}
		this.updateShareholderField(id, "locked", !share.locked)
	}
}

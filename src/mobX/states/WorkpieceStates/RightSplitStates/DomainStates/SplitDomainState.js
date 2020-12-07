import { action, computed, observable } from "mobx"

/**
 *	Base class for domain state managing shareholders
 **/
export default class SplitDomainState {
	constructor(rightSplit, shares, shareModel, initShareData) {
		this.rightSplit = rightSplit
		this.shareModel = shareModel
		this.initShareData = initShareData
		if (shares) this.initShareholders(shares)
	}

	@observable shareholders = new Map()

	/**
	 *	Provide a data structure that makes easier
	 *	to access and manipulate shares field values.
	 * 	(hence shareS valueS, because each share has
	 *	multiple values)
	 * 	@return: Array<{Field.value}>
	 **/
	@computed get sharesValues() {
		return [...this.shareholders.values()].map((share) => share.toJS())
	}

	@computed get shareTotal() {
		return this.sharesValues.reduce((n, current) => n + current.shares, 0)
	}

	@action removeShareholder(id) {
		this.shareholders.delete(id)
	}

	@action updateShareholder(id, share) {
		!share && this.shareholders.get(id).reset()
		!!share && this.shareholders.get(id).setFields(share)
	}

	@action addShareholder(id, shareData = this.initShareData) {
		if (this.shareholders.has(id)) {
			return
		}
		const newShare = new this.shareModel(id)
		newShare.init(shareData)
		// If the split has manual mode, check if the other shares are all locked.
		// In that case, lock also the new share.
		if (newShare.locked !== null && this.shareholders.size > 0) {
			const unlockedShareNb = this.sharesValues.reduce(
				(n, current) => (!current.locked ? ++n : n),
				0
			)
			if (unlockedShareNb === 0) {
				newShare.locked = true
			}
		}
		this.shareholders.set(id, newShare)
	}

	/**
	 *	Allows you to update the value of one of the observable Fields of a
	 *	a shareholder directly from the UI
	 **/
	@action updateShareField(id, field, value) {
		if (!this.shareholders.get(id)) {
			return
		}
		this.shareholders.get(id).setValue(field, value)
	}

	/**
	 *	Populate this.shareholders Map with the Array<ShareModel> argument
	 **/
	@action initShareholders(shares) {
		shares.forEach((share) => {
			this.addShare(share)
		})
		// const seenShareholders = []
		// shares.forEach((share) => {
		// 	seenShareholders.push(share.shareholderId)
		// 	if (this.shareholders.has(share.shareholderId)) {
		// 		this.updateShare(share)
		// 	} else {
		// 		this.addShare(share)
		// 	}
		// })
		// this.shareholders.forEach(
		// 	(value, key) =>
		// 		seenShareholders.indexOf(key) < 0 && this.removeShareholder(key)
		// )
	}

	/**
	 * Add diff to every share values.
	 * @param diff: float
	 * @param shares: Array<ShareModel>
	 */
	@action applyDiffToShares(diff, shares) {
		shares.forEach((share) => {
			const id = share.shareholderId
			if (this.shareholders.has(id)) {
				const newValue = this.shareholders.get(id).shares.value + diff
				this.shareholders.get(id).setValue("shares", newValue)
			}
		})
	}

	/**
	 *	Update all shares if no shares array are provided.
	 *	args:
	 *	- Array<ShareValues>: ShareValues must
	 *	be an object with a valid shareholderId key
	 *	- value: Value to update shares with. Default
	 *	to 1
	 **/
	@action setShares(shares = this.sharesValues, value = 1) {
		shares.forEach((share) => {
			this.shareholders.get(share.shareholderId).setValue("shares", value)
		})
	}

	addShare(share) {
		return this.addShareholder(share.shareholderId, share)
	}

	updateShare(share) {
		return this.updateShareholder(share.shareholderId, share)
	}

	removeShare(share) {
		return this.removeShareholder(share.shareholderId)
	}

	/**
	 *	Update shareholder shares with provided id and value. Then
	 *	update the other shareholders shares on an inverse pro rata basis
	 **/
	@action updateSharesProRata(id, value) {
		if (!this.shareholders.has(id)) {
			throw new Error(`Error: share holder ${id} not found`)
		}
		// Difference between actual share and value to apply
		// console.log("UPDATE SHARE", this.shareholders.get(id))
		const oldValue = this.shareholders.get(id).shares.value
		const diff = value - oldValue
		// Select other candidate shares
		console.log("SHARES VALUES", this.sharesValues)
		const sortedShares = this.sharesValues
			.filter((share) => share.shares && share.shareholderId !== id && !share.locked)
			.sort((a, b) => a.shares - b.shares)
		if (sortedShares.length === 0) {
			return
		}
		// If diff < 0, we subtract it from the shareholder and then
		// splitting it between other shareholders
		if (diff < 0) {
			this.applyDiffToShares(-diff / sortedShares.length, sortedShares)
		} else {
			//	Algorithm to split as equally as possible the
			//	difference (value - shareholder shares)
			//	Difference is equally subtracted to other shares as
			//	much as the current smallest share > 0, and so on
			//	until difference = 0
			let toSplit = diff
			while (toSplit > 0) {
				// 1. Filter shares equal to 0
				const shares = sortedShares.filter((share) => share.shares > 0)

				// 2. Select smallest non-zero share
				let smallestShare
				try {
					smallestShare = shares[0]
				} catch (e) {
					console.error("Error with smallest share", e, shares)
				}

				// 3. Try an equal split of toSplit between the other shareholders
				toSplit = toSplit - shares.length * smallestShare.shares

				if (toSplit > 0) {
					this.applyDiffToShares(-smallestShare.shares, shares)
				} else {
					this.applyDiffToShares(
						-(smallestShare.shares + toSplit / shares.length),
						shares
					)
				}
			}
		}

		this.shareholders.get(id).setValue("shares", value)
		console.log("TOTAL SHARE", this.shareTotal)
	}
}

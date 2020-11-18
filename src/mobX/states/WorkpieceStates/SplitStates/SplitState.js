import { action, computed, observable } from "mobx"

/**
 *	Base class for domain state managing share holders
 **/
export default class SplitState {
	constructor(shares, shareModel) {
		this.shareModel = shareModel
		if (shares) this.initShareHolders(shares)
	}

	@observable shareHolders = new Map()

	/**
	 * 	@return: Array<{Field.value}>
	 **/
	@computed get sharesValues() {
		return [...this.shareHolders.values()].map((share) => share.toJS())
	}

	@computed get shareTotal() {
		return this.sharesValues.reduce((n, current) => n + current.shares, 0)
	}

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
		const newShare = new this.shareModel(id)
		newShare.init(share)
		this.shareHolders.set(id, newShare)
	}

	/**
	 *	Allows you to update the value of one of the observable Fields of a
	 *	a shareholder directly from the UI
	 **/
	@action updateShareField(id, field, value) {
		if (!this.shareHolders.get(id)) {
			return
		}
		this.shareHolders.get(id).setValue(field, value)
	}

	/**
	 *	Populate this.shareHolders Map with the Array<ShareModel> argument
	 **/
	@action initShareHolders(shares) {
		shares.forEach((share) => {
			this.addShare(share)
		})
		// const seenShareHolders = []
		// shares.forEach((share) => {
		// 	seenShareHolders.push(share.shareHolderId)
		// 	if (this.shareHolders.has(share.shareHolderId)) {
		// 		this.updateShare(share)
		// 	} else {
		// 		this.addShare(share)
		// 	}
		// })
		// this.shareHolders.forEach(
		// 	(value, key) =>
		// 		seenShareHolders.indexOf(key) < 0 && this.removeRightHolder(key)
		// )
	}

	/**
	 * Add diff to every share values.
	 * @param diff: float
	 * @param shares: Array<ShareModel>
	 */
	@action applyDiffToShares(diff, shares) {
		shares.forEach((share) => {
			const id = share.shareHolderId
			if (this.shareHolders.has(id)) {
				const newValue = this.shareHolders.get(id).shares.value + diff
				this.shareHolders.get(id).setValue("shares", newValue)
			}
		})
	}

	/**
	 *	Update all shares if no shares array are provided.
	 *	args:
	 *	- Array<ShareValues>: ShareValues must
	 *	be an object with a valid shareHolderId key
	 *	- value: Value to update shares with. Default
	 *	to 1
	 **/
	@action setShares(shares = this.sharesValues, value = 1) {
		shares.forEach((share) => {
			this.shareHolders.get(share.shareHolderId).setValue("shares", value)
		})
	}

	addShare(share) {
		return this.addRightHolder(share.shareHolderId, share)
	}

	updateShare(share) {
		return this.updateRightHolder(share.shareHolderId, share)
	}

	removeShare(share) {
		return this.removeRightHolder(share.shareHolderId)
	}

	/**
	 *	Update shareholder shares with provided id and value. Then
	 *	update the other shareholders shares on an inverse pro rata basis
	 **/
	@action updateSharesProRata(id, value) {
		if (!this.shareHolders.has(id)) {
			throw new Error(`Error: share holder ${id} not found`)
		}
		// Difference between actual share and value to apply
		// console.log("UPDATE SHARE", this.shareHolders.get(id))

		const diff = value - this.shareHolders.get(id).shares.value
		// Select other candidate shares
		const sortedShares = [...this.shareHolders.values()]
			.filter((share) => share.shareHolderId !== id)
			.sort((a, b) => a.shares.value - b.shares.value)

		// If diff < 0, we subtract a portion from the shareholder and then
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
				const shares = sortedShares.filter((share) => share.shares.value > 0)

				// 2. Select smallest non-zero share
				let smallestShare
				try {
					smallestShare = shares[0].toJS()
				} catch (e) {
					console.error("Error with smallest share", e, shares)
				}

				// 3. Try an equal split of toSplit
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

		this.shareHolders.get(id).setValue("shares", value)
	}
}

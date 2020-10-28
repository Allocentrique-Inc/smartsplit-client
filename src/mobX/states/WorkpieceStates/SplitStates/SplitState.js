import { action, computed, observable } from "mobx"

export default class SplitState {
	constructor(shares, shareModel) {
		this.shareModel = shareModel
		if (shares) this.initShares(shares)
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
		const newShare = new this.shareModel(id)
		newShare.init(share)
		this.shareHolders.set(id, newShare)
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

	@action updateShareField(id, field, value) {
		if (!this.shareHolders.get(id)) {
			return
		}
		this.shareHolders.get(id).setValue(field, value)
	}

	@action initShares(shares) {
		const seenShareHolders = []
		shares.forEach((share) => {
			seenShareHolders.push(share.shareHolderId)
			if (this.shareHolders.has(share.shareHolderId)) {
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
	 * Computed array that contains
	 * the shares values
	 */
	@computed get sharesValues() {
		return [...this.shareHolders.values()].map((share) => share.toJS())
	}
}
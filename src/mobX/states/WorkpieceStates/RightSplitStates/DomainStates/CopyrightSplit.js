import SplitDomainState from "./SplitDomainState"

import { action, computed, observable, reaction } from "mobx"
import CopyrightSplitModel, {
	initData,
} from "../../../../models/workpieces/rights-splits/CopyrightSplitModel"

/**
 *	Copyright split domain state derived from SplitDomainState.
 *	Contains modes (equal, roles, manual) middleware logic
 **/
export default class CopyrightSplit extends SplitDomainState {
	constructor(rightSplit, shares) {
		super(rightSplit, shares, CopyrightSplitModel, initData)
		reaction(
			() => this.mode,
			() => {
				switch (this.mode) {
					case "equal":
						this.computeEqualMode()
						break
					case "roles":
						this.computeRolesMode()
						break
				}
			}
		)
	}

	@action computeEqualMode() {
		this.sharesValues.forEach((share) => {
			this.updateShareField(share.shareholderId, "shares", 1)
		})
	}

	@action computeRolesMode() {
		this.sharesValues.forEach((share) => {
			const musicContribNb = this.musicContributors.reduce(
				(n, current) => n + current.weighting,
				0
			)
			const lyricsContribNb = this.lyricsContributors.length
			let score = 0
			if (
				this.lyricsContributors.filter(
					(contrib) => contrib.shareholderId === share.shareholderId
				).length > 0
			) {
				score += (0.5 * this.shareholders.size) / lyricsContribNb
			}

			this.musicContributors.forEach((contrib) => {
				if (contrib.shareholderId === share.shareholderId) {
					score +=
						(0.5 * contrib.weighting * this.shareholders.size) / musicContribNb
				}
			})
			this.updateShareField(share.shareholderId, "shares", score)
		})
	}

	@action removeShareholder(id) {
		super.removeShareholder(id)
		this.setShares()
	}

	@action setRoles(id, roles) {
		this.updateShareField(id, "roles", roles)
		if (this.mode === "roles") {
			this.computeRolesMode()
		}
	}

	@observable mode = "equal"

	/**
	 *	Id List of lyrics contributors
	 *	Requires shareholder to have "composer"
	 *	and/or "author" role(s)
	 *	return Array<shareData>
	 **/
	@computed get lyricsContributors() {
		const isLyricsContrib = (roles) =>
			roles.includes("author") || roles.includes("adapter")
		return this.sharesValues.filter((share) => isLyricsContrib(share.roles))
	}

	/**
	*	Id List of music contributors
	*	Each composer and mixer are considered 
	*	contributor. So an id can be twice in the
	*	list.

	*	return Array<{...shareData, weighting}>
	**/
	@computed get musicContributors() {
		const isMusicContrib = (roles) =>
			roles.includes("composer") || roles.includes("mixer")
		const contribs = this.sharesValues.filter((share) =>
			isMusicContrib(share.roles)
		)
		const list = []
		contribs.forEach((contrib) => {
			contrib.weighting = 0
			if (contrib.roles.includes("composer")) {
				contrib.weighting += 1
			}
			if (contrib.roles.includes("mixer")) {
				contrib.weighting += 1
			}
			list.push(contrib)
		})
		return list
	}

	@computed get composerChosen() {
		return (
			this.sharesValues.filter((share) => share.roles.includes("composer"))
				.length > 0
		)
	}

	@computed get authorChosen() {
		return (
			this.sharesValues.filter((share) => share.roles.includes("author"))
				.length > 0
		)
	}

	/**
	 *	Action that toggles lock state of the share with the provided id.
	 *	Detect if the action is a locking or an unlocking. In the first case,
	 *	if there is only one share unlocked, the action locks it too to prevent the
	 * 	user from manually modifying it. Otherwise it would provoke a UI bug, the
	 *	corresponding slider UI would react without making change to the actual shares.
	 **/
	@action toggleShareLock(id) {
		const share = this.shareholders.get(id)
		if (share.locked) {
			const otherShares = this.sharesValues.filter(
				(share) => share.shareholderId !== id && share.locked
			)
			otherShares.forEach(
				(share) => (this.shareholders.get(share.shareholderId).locked = false)
			)
		} else {
			const otherShares = this.sharesValues.filter(
				(share) => share.shareholderId !== id && !share.locked
			)
			if (otherShares.length === 1) {
				this.shareholders.get(otherShares[0].shareholderId).locked = true
			}
		}
		this.shareholders.get(id).locked = !share.locked
	}
}

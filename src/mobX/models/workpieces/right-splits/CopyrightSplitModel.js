import RightSplitModel from "./RightSplitModel"
import CopyrightShareModel, { initShareData } from "./CopyrightShareModel"
import { action, computed, observable, reaction } from "mobx"

/**
 *	Copyright split model derived from RightSplitModel
 *	Contains split modes (equal, roles, manual) middleware logic
 **/
export default class CopyrightSplitModel extends RightSplitModel {
	constructor(parent) {
		super(parent, CopyrightShareModel, initShareData)
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

	@observable mode = "equal"
	type = "copyright"

	/**
	 *	Id List of lyrics contributors
	 *	Requires shareholder to have "composer"
	 *	and/or "author" role(s)
	 *	return Array<shareData>
	 **/
	@computed get lyricsContributors() {
		const isLyricsContrib = (roles) =>
			roles.includes("author") || roles.includes("adapter")
		return this.shareholdersValues.filter((share) =>
			isLyricsContrib(share.roles)
		)
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
		const contribs = this.shareholdersValues.filter((share) =>
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
			this.shareholdersValues.filter((share) =>
				share.roles.includes("composer")
			).length > 0
		)
	}

	@computed get authorChosen() {
		return (
			this.shareholdersValues.filter((share) => share.roles.includes("author"))
				.length > 0
		)
	}

	@action computeEqualMode() {
		this.shareholdersValues.forEach((share) => {
			this.updateShareholderField(share.id, "shares", 1)
		})
	}

	@action computeRolesMode() {
		this.shareholdersValues.forEach((share) => {
			const musicContribNb = this.musicContributors.reduce(
				(n, current) => n + current.weighting,
				0
			)
			const lyricsContribNb = this.lyricsContributors.length
			let score = 0
			if (
				this.lyricsContributors.filter((contrib) => contrib.id === share.id)
					.length > 0
			) {
				score += (0.5 * this.shareholdersValues.length) / lyricsContribNb
			}

			this.musicContributors.forEach((contrib) => {
				if (contrib.id === share.id) {
					score +=
						(0.5 * contrib.weighting * this.shareholdersValues.length) /
						musicContribNb
				}
			})
			this.updateShareholderField(share.id, "shares", score)
		})
	}

	@action removeShareholder(id) {
		super.removeShareholder(id)
		this.setShares()
	}

	@action setRoles(id, roles) {
		this.updateShareholderField(id, "roles", roles)
		if (this.mode === "roles") {
			this.computeRolesMode()
		}
	}
}

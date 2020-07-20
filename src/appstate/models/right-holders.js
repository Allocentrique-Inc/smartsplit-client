import { Observable } from "../store"
import { searchRightHolders } from "../../../api/right-holders"

export class RightHolders extends Observable {
	constructor() {
		super()
		this.rightHolders = {}
		this.version = 0
	}

	async doSearch(terms) {
		const results = await searchRightHolders(terms)

		for (let rh of results) {
			this.rightHolders[rh.rightHolder_id] = rh
		}

		this.version++
		this.notify("update")
		return results
	}

	search(terms) {
		terms = terms.split(" ").map((term) => new RegExp(term, "i"))
		const output = []

		return Object.values(this.rightHolders)
			.map((rh) => {
				rh = { data: rh, score: 0 }

				for (let term of terms) {
					rh.score +=
						scoreTerm(rh.data.artistName || "", term) * 1.5 +
						scoreTerm(rh.data.firstName || "", term) * 1.2 +
						scoreTerm(rh.data.lastName || "", term) * 1.0
				}

				return rh
			})
			.filter((rh) => rh.score > 0)
			.sort((a, b) => b.score - a.score)
			.map((rh) => rh.data)
	}
}

function scoreTerm(text, term) {
	return text.search(term) + 1
}

import { useStorePath, useStores } from "./index"
import { toJS } from "mobx"
import { useTranslation } from "react-i18next"

export function useEntity(paths, entityId) {
	const entityList = useStorePath(...paths)
	entityList.fetch(entityId)
	return entityList ? entityList.get(entityId) : null
}

export function useAuthUser() {
	const auth = useStorePath("auth")
	return auth.user
}

export function useDocsModel(workpieceId, type = null) {
	if (!type)
		return useStorePath("workpieces", "list", workpieceId, "documentation")
	else
		return useStorePath(
			"workpieces",
			"list",
			workpieceId,
			"documentation",
			type
		)
}

export function useRightSplits(workpieceId, type) {
	if (!type) {
		return useStorePath("workpieces", "list", workpieceId, "rightSplits")
	} else {
		return useStorePath("workpieces", "list", workpieceId, "rightSplits", type)
	}
}

export function useProtectModel(workpieceId, type = null) {
	if (!type)
		return useStorePath("workpieces", "list", workpieceId, "protection")
	else
		return useStorePath("workpieces", "list", workpieceId, "protection", type)
}

export const ResultsOrder = {
	collaboratorsFirst: "collaborators",
	contributorsFirst: "contributors",
}
/**
 * returns a function to be used to obtain a list people in the collaborator or contributor dropdowns
 * this function best used in conjunction with useMemo from React
 *
 * The algorithm is as follows:
 *   - first match collaborators and contributors -- this is easy: no API call
 *     results likely to be less than 1000 even 100 for both for moat people
 *     perhaps even 10
 *   - then if order is ResultsOrder.collaborators, show collaborators first, then contributors
 *          if order is ResultsOrder.contributors, show contributors first, then collaborators
 *   - then collaborators of collaborators
 *   - then general users
 *   - each step we check that the maximum number has been obtained before
 *
 * @return {function(string, number=): ([])}
 */
export function useArtistAutocomplete(): (string, number, ResultsOrder) => [] {
	const { t, i18n } = useTranslation()
	const { collaborators, contributors, users, auth } = useStores()
	let current = toJS(auth.user.data)
	current.artistName = t("general:me")
	let collabList = [current]
	collabList = collabList.concat(toJS(collaborators.list))

	console.log(collabList)
	//const contribList = JSON.parse(JSON.stringify(toJS(contributors.list)))
	//console.log(contribList)
	const usersList = JSON.parse(JSON.stringify(toJS(users.list)))
	//console.log(usersList)
	function exists(arr: Array, name) {
		let _exists = false
		arr.forEach((el) => {
			if (el.firstName + " " + el.lastName === name) _exists = true
		})
		return _exists
	}

	/**
	 * The returned function uses the store values of ContributorState.list and CollaboratorState.list
	 *
	 *
	 * @param search {string} the search entered into the add user type combo-box
	 * @param max {number} the number of results to display
	 * @param order {ResultsOrder} whether collaborators or contributors should come first
	 * @return {Array<{firstName:string,lastName:string,artistName:string,user_id:guid}>}
	 */
	return (search: string, max: number = 5) => {
		//let returnList = []
		if (!search) return collabList.splice(0, max)
		//console.log(search)
		///
		/// first get collaborators that match
		///
		let filteredCollabs = Object.values(toJS(collabList)).filter((collab) => {
			//if (!search) return true
			let name = collab.firstName + " " + collab.lastName
			return name.indexOf(search) > -1
		})

		return filteredCollabs.splice(0, max)

		/*	//console.log(returnList)

		///
		/// next get contributors that match
		///
		let filteredContribs = Object.values(toJS(contribList)).filter(
			(contrib) => {
				let name = contrib.firstName + " " + contrib.lastName
				if (exists(returnList, name)) return false
				if (!search) return true
				return name.indexOf(search) > -1
			}
		)
		if (order === ResultsOrder.collaboratorsFirst) {
			returnList = returnList
				.concat(filteredCollabs)
				.concat(filteredContribs)
		} else {
			returnList = returnList = returnList
				.concat(filteredContribs)
				.concat(filteredCollabs)
		}

		//console.log(returnList)
		if (returnList.length >= max) return returnList.splice(0, max)

		///
		/// TODO: obtain a list of collaborators of collaborators
		///

		///
		/// finally add matching users
		///

		let filteredUsers = Object.values(toJS(usersList))
			.splice(0, max)
			.map((user) => user.data)
			.filter((user) => {
				if (!user.lastName && !user.firstName) return false
				let name = user.firstName + " " + user.lastName
				if (exists(returnList, name)) return false
				if (!search) return true
				return name.indexOf(search) > -1
			})

		returnList = returnList.concat(filteredUsers)
		if (returnList.length >= max) return returnList.splice(0, max)
		return returnList*/
	}
}

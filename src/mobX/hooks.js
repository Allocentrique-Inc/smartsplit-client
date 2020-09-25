import { useStorePath, useStores } from "./index"
import { toJS } from "mobx"

export function useEntity(paths, entityId) {
	const entityList = useStorePath(...paths)
	entityList.fetch(entityId)
	return entityList ? entityList.get(entityId) : null
}

export function useAuthUser() {
	const auth = useStorePath("auth")
	return auth.user
}

export function useSplitsPagesState() {
	const { splitsPages } = useStores()
	return splitsPages
}

export function useDocsModel(workpieceId, type) {
	return useStorePath("workpieces", "list", workpieceId, "documentation", type)
}

/**
 * returns a function to be used to obtain a list people in the collaborator or contributor dropdowns
 * this function best used in conjunction with useMemo from React
 *
 * The algorithm is as follows:
 *   - first match collaborators,
 *   - then contributors
 *   - then collaborators of collaborators
 *   - then general users
 *
 * @return {function(string, number=): ([])}
 */
export function useArtistAutocomplete(): (string, number) => [] {
	const { collaborators, contributors, users } = useStores()
	const collabList = JSON.parse(JSON.stringify(toJS(collaborators.list)))
	console.log(collabList)
	const contribList = JSON.parse(JSON.stringify(toJS(contributors.list)))
	console.log(contribList)
	const usersList = JSON.parse(JSON.stringify(toJS(users.list)))
	console.log(usersList)
	function exists(arr: Array, name) {
		let _exists = false
		arr.forEach((el) => {
			if (el.firstName + " " + el.lastName === name) _exists = true
		})
		return _exists
	}

	return (search: string, max: number = 10) => {
		let returnList = []
		if (!search) return returnList
		console.log(search)
		///
		/// first get collaborators that match
		///
		let filteredCollabs = Object.values(toJS(collabList)).filter((collab) => {
			//if (!search) return true
			let name = collab.firstName + " " + collab.lastName
			return name.indexOf(search) > -1
		})

		returnList = filteredCollabs
		if (returnList.length === max) return returnList
		console.log(returnList)

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

		returnList = returnList.concat(filteredContribs)
		console.log(returnList)
		if (returnList.length >= max) return returnList.splice(0, max)

		///
		/// TODO: obtain a list of collaborators of collaborators
		///

		///
		/// finally add matching users
		///

		let filteredUsers = Object.values(toJS(usersList))
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
		return returnList
	}
}

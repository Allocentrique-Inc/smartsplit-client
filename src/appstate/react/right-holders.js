import { useEffect, useMemo } from "react"
import { useStorePath } from "."

export const SEARCH_DELAY = 1000
export const SEARCH_MIN_CHARS = 2

export function useRightHolderSearch(terms) {
	const rightHolders = useStorePath("rightHolders")
	let hasSearched = false

	function doSearch() {
		if (hasSearched || terms.length < SEARCH_MIN_CHARS) return
		hasSearched = true
		rightHolders.doSearch(terms)
	}

	useEffect(() => {
		const timeout = setTimeout(doSearch, SEARCH_DELAY)
		return () => {
			clearTimeout(timeout)
		}
	}, [terms])

	useEffect(() => {
		doSearch()
	}, [terms.length > SEARCH_MIN_CHARS])

	return useMemo(
		function () {
			if (terms.length === 0) {
				return []
			} else {
				return rightHolders.search(terms)
			}
		},
		[terms, rightHolders.version]
	)
}

import { useEffect, useMemo } from "react"
import { useStorePath } from "."

export function useRightHolderSearch(terms, searchDelay = 1000, minChars = 2) {
	const rightHolders = useStorePath("rightHolders")
	//console.log("DEBUG", rightHolders)
	let hasSearched = false

	function doSearch() {
		if (hasSearched || terms.length < minChars) return
		hasSearched = true
		rightHolders.doSearch(terms)
	}

	useEffect(() => {
		const timeout = setTimeout(doSearch, searchDelay)
		return () => {
			clearTimeout(timeout)
		}
	}, [terms])

	useEffect(() => {
		doSearch()
	}, [terms.length > minChars])

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

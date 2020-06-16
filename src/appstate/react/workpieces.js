import { useEffect, useReducer } from "react"
import { useCurrentWorkpiece } from "../../pages/workpieces/context"

export function useRightSplit(type) {
	const [, rerender] = useReducer((n) => n + 1, 0)
	const splits = useCurrentWorkpiece("rightsSplits", type)
	const shares = useCurrentWorkpiece("rightsSplits", type, "allShares")
	useEffect(() => {
		const unsubscribes = shares.map((share) => share.subscribe(rerender))
		return () => {
			unsubscribes.forEach((unsub) => unsub())
		}
	}, [shares])
	function addShareHolder(id) {
		if (splits.hasOwnProperty(id)) return
		splits.addRightHolder(id, {
			shares: 1,
		})
	}
	return [splits, shares, addShareHolder]
}

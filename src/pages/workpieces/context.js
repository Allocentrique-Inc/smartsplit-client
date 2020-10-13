import { createContext, useContext } from "react"

export const WorkpieceContext = createContext({})

export function useCurrentWorkpiece() {
	return useContext(WorkpieceContext)
}

export function useRightSplit(type) {
	return useCurrentWorkpiece().rightsSplits[type]
}

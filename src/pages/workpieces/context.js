import { createContext, useContext } from "react"

export const WorkpieceContext = createContext({})

export function useCurrentWorkpiece() {
	return useContext(WorkpieceContext)
}

export function useRightsSplits(type) {
	return type ? useCurrentWorkpiece().rightsSplits[type] : useCurrentWorkpiece().rightsSplits
}

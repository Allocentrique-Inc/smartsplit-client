import { createContext, useContext } from "react"
import { useSubpath } from "../../appstate/react"
import { useStorePath } from "../../mobX"
import { isObservable } from "mobx"

export const WorkpieceContext = createContext({})

export function useCurrentWorkpiece() {
	return useContext(WorkpieceContext)
}

export function useRightSplit(type) {
	return useCurrentWorkpiece().rightsSplits[type]
}

import { createContext, useContext } from "react"
import { useSubpath } from "../../appstate/react"
import { useStorePath } from "../../mobX"
import { isObservable } from "mobx"

export const WorkpieceContext = createContext({})

export function useCurrentWorkpiece(...path) {
	return useContext(WorkpieceContext)
}


export function useRightSplit(type) {
	// console.log(isObservable(useCurrentWorkpiece().rightsSplits))
	return useCurrentWorkpiece().rightsSplits[type]
}
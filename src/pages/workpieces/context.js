import { createContext, useContext } from "react"
import { useSubpath } from "../../appstate/react"

export const WorkpieceContext = createContext()

export function useCurrentWorkpiece(...path) {
	return useSubpath(useContext(WorkpieceContext), ...path)
}

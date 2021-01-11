import { createContext, useContext } from "react"

export const WorkpieceContext = createContext()

export function useCurrentWorkpiece() {
	return useContext(WorkpieceContext)
}

export function useCurrentWorkpieceId() {
	return useContext(WorkpieceContext).id
}

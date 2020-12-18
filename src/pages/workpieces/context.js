import { createContext, useContext } from "react"
import { observable } from "mobx"
import RightSplitsState from "../../mobX/states/workpiece-state/right-splits/RightSplitsState"

export const WorkpieceContext = createContext()

export class CurrentWorkpiece {
	constructor(workpiece) {
		this.workpiece = workpiece

		// Create right splits state with workpiece right split models
		this.rightSplits = new RightSplitsState(workpiece.rightSplits)
	}
	@observable workpiece
	@observable rightSplits
}
export function useCurrentWorkpiece() {
	return useContext(WorkpieceContext).workpiece
}

export function useRightSplits(type) {
	return type
		? useContext(WorkpieceContext).rightSplits[type]
		: useContext(WorkpieceContext).rightSplits
}

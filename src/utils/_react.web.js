import { unstable_batchedUpdates } from "react-dom"

export function batchedUpdates(callback) {
	return unstable_batchedUpdates(callback)
}

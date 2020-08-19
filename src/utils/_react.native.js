import { unstable_batchedUpdates } from "react-native"

export function batchedUpdates(callback) {
	return unstable_batchedUpdates(callback)
}

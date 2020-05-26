export function watch(store, map, callback) {
	function getValue() {
		const state = store.getState()

		try {
			return map(state)
		} catch (e) {
			console.warn("Failed to map state to value", state, e)
			return undefined
		}
	}

	let current = getValue(store.getState())

	return store.subscribe(function (state) {
		const value = getValue(state)

		if (current !== value) {
			callback(value, current)
		}

		current = value
	})
}

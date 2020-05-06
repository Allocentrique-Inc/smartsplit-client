import { useState } from "react"

/**
 * Comme `useState`, mais pour chaque propriété d'un objet, optionellement mutable
 *
 * Par exemple:
 * ```js
 * const state = useStates({A: 1, B: 2})
 * // équivalent à
 * const [A, setA] = useState(1)
 * const [B, setB] = useState(2)
 *
 * // Lire A
 * state.A
 * A
 *
 * // Lire B
 * state.A
 * B
 *
 * // Modifier A
 * setA(3)
 * state.A = 3
 * ```
 */
export function useStates(states, freeze = true) {
	const obj = Object.create(null)

	function defineState(key, value) {
		let [state, setState] = useState(value)

		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: false,
			get: function () {
				return state
			},
			set: function (newValue) {
				setState(newValue)
				if (!freeze) state = newValue
				return newValue
			},
		})
	}

	for (let key in states) {
		defineState(key, states[key])
	}

	if (freeze) {
		Object.freeze(obj)
	}

	return obj
}

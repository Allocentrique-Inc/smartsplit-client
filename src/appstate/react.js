import React, { useEffect, useReducer, useContext } from "react"
import { Observable } from "./store"
import deepEqual from "deep-equal"

const Context = React.createContext()
export const StoreProvider = Context.Provider

export function deepNotEqual(a, b) {
	return !deepEqual(a, b, { strict: true })
}

export const injectReactHooks = {
	useSelector(selector, dependencies = []) {
		return this.useTransition(selector, deepNotEqual, dependencies)
	},

	useTransition(select, compare, dependencies = []) {
		let selected = select(this)
		const [, update] = useReducer((n) => n + 1, 0)

		useEffect(() => {
			return this.subscribe(() => {
				let next = select(this)

				if (compare(selected, next)) {
					update()
				}

				selected = next
			})
		}, dependencies)

		return selected
	},

	use(dependencies = []) {
		const [, update] = useReducer((n) => n + 1, 0)

		useEffect(() => {
			return this.subscribe(() => update())
		}, dependencies)

		return this
	},
}

export function useStore() {
	return useContext(Context)
}

export function useStorePath(...path) {
	return useSubpath(useStore(), ...path)
}

export function useSubpath(current, ...path) {
	for (let branch of path) {
		if (
			typeof current[branch] !== "function" &&
			typeof current[branch] !== "object"
		) {
			return undefined
		}

		current = current[branch]

		if (current instanceof Observable) {
			current.use()
		}
	}

	return current
}

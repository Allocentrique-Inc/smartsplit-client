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
	const [, update] = useReducer((n) => n + 1, 0)
	const unsubscribes = []

	function watchPath(observable, key) {
		let value = observable[key]

		unsubscribes.push(
			observable.subscribe(() => {
				if (observable[key] !== value) {
					value = observable[key]
					update()
				}
			})
		)
	}

	for (let branch of path) {
		// If we try to dig into something that's not an object, abort
		if (typeof current !== "function" && typeof current !== "object") {
			return undefined
		}

		if (current instanceof Observable) {
			watchPath(current, branch)
		}

		current = current[branch]
	}

	useEffect(() => {
		if (current instanceof Observable) {
			unsubscribes.push(current.subscribe(() => update()))
		}

		return function () {
			unsubscribes.forEach((unsubscribe) => unsubscribe())
		}
	}, [])

	return current
}

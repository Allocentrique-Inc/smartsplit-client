import React from "react"
import { isObservable } from "mobx"
import BlaState from "./states/BlaState"
import TestState from "./states/TestState"

export const storesContext = React.createContext({
	bla: new BlaState(),
	test: new TestState(),
})

export const useStores = () => React.useContext(storesContext)

export const useStorePath = (...paths) => {
	const stores = useStores()
	let error = false
	let current = stores
	paths.forEach((path) => {
		if (isObservable(current[path])) {
			current = current[path]
		} else {
			error = true
		}
	})
	if (error) console.error("useStorePath: path was invalid")
	return error ? null : current
}

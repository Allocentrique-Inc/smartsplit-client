import React, { useReducer, useEffect } from "react"
import { batchedUpdates } from "./_react"

let reactBatchUpdateQueue = []

export function forEachChildren(children, cb) {
	let index = 0

	function processChildren(children) {
		if (!children) {
			return
		} else if (typeof children !== "object") {
			cb(children, index++)
		} else if (Array.isArray(children)) {
			children.forEach(processChildren)
		} else if (children.type === React.Fragment) {
			processChildren(children.props.children)
		} else {
			cb(children, index++)
		}
	}

	processChildren(children)
}

export function mapChildren(children, fn) {
	const newChilds = []

	forEachChildren(children, function (child, index) {
		newChilds.push(fn(child, index))
	})

	return newChilds
}

export function mapFragmentChildren(fragment, fn) {
	return React.createElement(React.Fragment, {}, ...mapChildren(fragment, fn))
}

export function mapFragment(fragment, fn) {
	return React.createElement(
		React.Fragment,
		{},
		...fragment.props.children.map(fn)
	)
}

export function joinElements(elements, spacer) {
	const output = []
	elements.forEach((element, index) => {
		output.push(element)
		output.push(React.cloneElement(spacer, { key: "spacer-" + index }))
	})
	output.pop()
	return output
}

export { batchedUpdates }

export function queueBatchedUpdate(callback) {
	reactBatchUpdateQueue.push(callback)

	if (reactBatchUpdateQueue.length === 1) {
		setImmediate(dispatchBatchedUpdates)
	}
}

function dispatchBatchedUpdates() {
	batchedUpdates(function () {
		// Manual loop here as the array might grow as we dispatch the events

		for (let i = 0; i < reactBatchUpdateQueue.length; i++) {
			try {
				reactBatchUpdateQueue[i]()
			} catch (e) {
				console.error("Error in batched update:", e)
			}
		}

		reactBatchUpdateQueue = []
	})
}

export function useUpdateFunction() {
	let mounted = true
	const [, update] = useReducer((n) => n + 1, 0)

	useEffect(function () {
		return function () {
			mounted = false
		}
	}, [])

	return function () {
		queueBatchedUpdate(function () {
			if (mounted) update()
		})
	}
}

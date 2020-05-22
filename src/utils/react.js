import React from "react"

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
	forEachChildren(children, (child) => newChilds.push(fn(child)))
	return newChilds
}

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

import React, { useState, useRef, useLayoutEffect } from "react"
import { forEachChildren } from "./react"
import { Platform } from "../platform"
import { TouchableWithoutFeedback } from "react-native"

export function useFocusGroup(nodes, onFocus, onBlur) {
	if (nodes === null) return
	const [currentFocus, setCurrentFocus] = useState(null)
	const newNodes = new Map()
	forEachChildren(nodes, (child) => {
		newNodes.set(
			child.key,
			Platform.web ? (
				React.cloneElement(child, {
					focus: child.key === currentFocus,
					onMouseEnter: (e) => {
						setCurrentFocus(child.key)
						onFocus && onFocus(child.key, e)
					},
					onMouseLeave: (e) => {
						setCurrentFocus(null)
						onBlur && onBlur(child.key, e)
					},
				})
			) : (
				<TouchableWithoutFeedback
					onPress={() => {
						setCurrentFocus(child.key !== currentFocus ? child.key : null)
					}}
					key={child.key}
				>
					{React.cloneElement(child, { focus: child.key === currentFocus })}
				</TouchableWithoutFeedback>
			)
		)
	})
	return [newNodes, currentFocus, setCurrentFocus]
}

export function useDimensions() {
	const ref = useRef()
	const [dimensions, setDimensions] = useState({})
	useLayoutEffect(() => {
		ref.current.measure((x, y, width, height) =>
			setDimensions({ x, y, width, height })
		)
	}, [ref.current])
	return [ref, dimensions]
}

export function useInterpolators([min0, max0], [min1, max1]) {
	const range0 = max0 - min0
	const range1 = max1 - min1

	function fromRange0To1(value) {
		return ((value - min0) * range1) / range0 + min1
	}

	function fromRange1To0(value) {
		return ((value - min1) * range0) / range1 + min0
	}

	return [fromRange0To1, fromRange1To0]
}

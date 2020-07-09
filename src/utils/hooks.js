import React, { useState } from "react"
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

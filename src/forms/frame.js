import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import FormStyles from "../styles/forms"
import MetricsStyles from "../styles/metrics"

export default function Frame(props) {
	const { as, focused, error, style, children, viewRef, ...nextProps } = props
	const Container = as || View

	const combinedStyles = [
		FormStyles.frame,
		focused ? FormStyles.frame_focused : null,
		error ? FormStyles.frame_error : null,
		style,
	]

	if (viewRef) nextProps.ref = viewRef

	return (
		<Container style={combinedStyles} {...nextProps}>
			{children}
		</Container>
	)
}

export function useFrameFocus(initialFocus = false, inputProps = {}) {
	const [focused, setFocus] = useState(initialFocus)

	return {
		value: focused,
		props: {
			onFocus: function () {
				if (typeof inputProps.onFocus === "function") {
					inputProps.onFocus()
				}
				setFocus(true)
			},
			onBlur: function () {
				if (typeof inputProps.onBlur === "function") {
					inputProps.onBlur()
				}
				setFocus(false)
			},
		},
	}
}

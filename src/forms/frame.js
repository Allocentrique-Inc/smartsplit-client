import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import FormStyles from "../styles/forms"
import MetricsStyles from "../styles/metrics"

export default function Frame(props) {
	const { focused, style, children, viewRef, ...nextProps } = props

	const combinedStyles = [
		FormStyles.frame,
		focused ? FormStyles.frame_focused : null,
		style,
	]

	if (viewRef) nextProps.ref = viewRef

	return (
		<View style={combinedStyles} {...nextProps}>
			{children}
		</View>
	)
}

export function useFrameFocus(initialFocus = false) {
	const [focused, setFocus] = useState(initialFocus)

	return {
		value: focused,
		props: {
			onFocus: function () {
				setFocus(true)
			},
			onBlur: function () {
				setFocus(false)
			},
		},
	}
}

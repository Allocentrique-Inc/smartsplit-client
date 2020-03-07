import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import FormStyles from "../../../styles/forms"
import MetricsStyles from "../../../styles/metrics"

export default function Framed(props) {
	const combinedStyles = [
		FormStyles.frame,
		props.focused ? FormStyles.frame_focused : null,
		props.style,
	]

	return <View style={combinedStyles}>{props.children}</View>
}

export function useFrameFocus(initialFocus = false) {
	const [focused, setFocus] = useState(initialFocus)

	return {
		value: focused,
		props: {
			onFocus: function() {
				setFocus(true)
			},
			onBlur: function() {
				setFocus(false)
			}
		}
	}
}

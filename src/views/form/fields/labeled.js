import React from "react"
import { View, StyleSheet } from "react-native"
import FormStyles from "../../../styles/forms"
import { Row } from "../../layout"
import { Text } from "../../text"

const UNDERTEXT_DEFAULT_LINES = 4

export default function Labeled(props) {
	const {
		style,
		childStyle,
		label,
		label_hint,
		children,
		component,
		undertext,
		undertext_lines,
		...childProps
	} = props
	
	const ChildComponent = component
	const inputComponent = ChildComponent
		? <ChildComponent {...childProps} style={childStyle} />
		: children
	
	return <View style={StyleSheet.compose(FormStyles.label_wrap, style)}>
		{(label || label_hint) && (
			<Row>
				<Text bold inside style={FormStyles.label} numberOfLines={1}>{label}</Text>
				<Text inside style={FormStyles.label_hint}>{label_hint}</Text>
			</Row>
		)}
		
		{inputComponent}
		
		{undertext && (
			<Text
				small
				inside
				style={FormStyles.undertext}
				numberOfLines={undertext_lines || UNDERTEXT_DEFAULT_LINES}
			>{undertext}</Text>
		)}
	</View>
}

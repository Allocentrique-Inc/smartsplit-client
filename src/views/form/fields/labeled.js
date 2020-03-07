import React from "react"
import FormStyles from "../../../styles/forms"
import { Column, Row } from "../../layout"
import { Text } from "../../text"

const UNDERTEXT_DEFAULT_LINES = 4

export default function Labeled(props) {
	const {
		style,
		of,
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
	
	return <Column of={of || "inside"} style={[FormStyles.label_wrap, style]}>
		{(label || label_hint) && (
			<Row of="component">
				<Text bold style={FormStyles.label} numberOfLines={1}>{label}</Text>
				<Text style={FormStyles.label_hint}>{label_hint}</Text>
			</Row>
		)}
		
		{inputComponent}
		
		{undertext && (
			<Text
				small
				style={FormStyles.undertext}
				numberOfLines={undertext_lines || UNDERTEXT_DEFAULT_LINES}
			>{undertext}</Text>
		)}
	</Column>
}

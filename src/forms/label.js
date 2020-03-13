import React from "react"
import FormStyles from "../styles/forms"
import { Column, Row } from "../layout"
import { Text } from "../text"

const UNDERTEXT_DEFAULT_LINES = 4

export function labelProps(props) {
	const {
		label,
		label_hint,
		undertext,
		undertext_lines,
		...nextProps
	} = props
	
	return nextProps
}

export default function Label(props) {
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
	
	return <Column of="inside" style={[FormStyles.label_wrap, style]}>
		{(label || label_hint) && (
			<Row of="component">
				<LabelText>{label}</LabelText>
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

export function LabelText(props) {
	return <Text
		bold
		style={FormStyles.label}
		numberOfLines={1}
	>{props.children}</Text>
}

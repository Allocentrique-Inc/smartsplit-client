import React from "react"
import FormStyles from "../styles/forms"
import { Column, Row, Flex } from "../layout"
import { Text } from "../text"
import { TooltipIcon } from "../widgets/tooltip"

const UNDERTEXT_DEFAULT_LINES = 4

export function labelProps(props) {
	return {
		label: props.label,
		label_hint: props.label_hint,
		undertext: props.undertext,
		undertext_lines: props.undertext_lines,
		tooltip: props.tooltip,
	}
}

export default function Label(props) {
	const {
		style,
		childStyle,
		error,
		label,
		label_hint,
		children,
		component,
		undertext,
		undertext_lines,
		tooltip,
		...childProps
	} = props

	const ChildComponent = component
	const inputComponent = ChildComponent ? (
		<ChildComponent {...childProps} style={childStyle} error={error} />
	) : (
		children
	)

	return (
		<Column of="inside" style={[FormStyles.label_wrap, style]}>
			{(label || label_hint) && (
				<Row of="inside" valign="center">
					<LabelText>{label}</LabelText>
					{tooltip && <TooltipIcon text={tooltip} />}
					<Flex />
					<Text style={FormStyles.label_hint}>{label_hint}</Text>
				</Row>
			)}

			{inputComponent}

			{typeof error === "string" ? (
				<Text error small>
					{error}
				</Text>
			) : (
				error
			)}

			{undertext && (
				<Text
					small
					style={FormStyles.undertext}
					numberOfLines={undertext_lines || UNDERTEXT_DEFAULT_LINES}
				>
					{undertext}
				</Text>
			)}
		</Column>
	)
}

export function LabelText(props) {
	return (
		<Text bold style={FormStyles.label} numberOfLines={1}>
			{props.children}
		</Text>
	)
}

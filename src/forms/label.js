import React from "react"
import FormStyles from "../styles/forms"
import { Column, Row, Flex } from "../layout"
import { Text } from "../text"
import { TooltipIcon } from "../widgets/tooltip"

const UNDERTEXT_DEFAULT_LINES = 4

export function labelProps(props) {
	return {
		label: props.label,
		subLabel: props.label,
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
		subLabel,
		label_hint,
		children,
		component,
		undertext,
		undertext_lines,
		tooltip,
		...childProps
	} = props

	const ChildComponent = component
	const inputComponent = component
		? React.createElement(
				component,
				{ ...childProps, style: childStyle, error },
				children
		  )
		: children

	const wrapError =
		error &&
		(typeof error === "string" ||
			(typeof error === "object" && error.type === React.Fragment))

	return (
		<Column of="inside" style={[FormStyles.label_wrap, style]}>
			{(label || label_hint || subLabel) && (
				<>
					<Row of="inside" valign="center">
						<LabelText>{label}</LabelText>
						{tooltip && <TooltipIcon text={tooltip} />}
						<Flex />
						<Text style={FormStyles.label_hint}>{label_hint}</Text>
					</Row>
					<Row of="inside">{subLabel && <Text secondary>{subLabel}</Text>}</Row>
				</>
			)}

			{inputComponent}

			{wrapError ? (
				<Text error small>
					{error}
				</Text>
			) : null}

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
		<>
			<Text bold style={FormStyles.label} numberOfLines={1}>
				{props.children}
			</Text>
		</>
	)
}

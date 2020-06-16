import React, { useState } from "react"
import { TouchableWithoutFeedback } from "react-native"
import { Svg, Rect, Path } from "react-native-svg"

import { Column, Row } from "../layout"
import { Text } from "../text"
import { Colors, Metrics } from "../theme"
import FormStyles from "../styles/forms"

const CheckBoxContext = React.createContext({})
CheckBoxContext.displayName = "CheckBoxGroupContext"
const UNDERTEXT_DEFAULT_LINES = 1

export function CheckBoxGroup({
	label,
	error,
	undertext,
	undertext_lines,
	disabled,
	selection,
	onSelect,
	onUnselect,
	children,
	...nextProps
}) {
	const [selectionState, setSelectionState] = useState([])
	const actualSelection = onSelect ? selection : selectionState
	const addToSelection = (value) => {
		if (selectionState.includes(value)) return
		actualSelection.push(value)
		setSelectionState([...actualSelection])
	}
	const removeFromSelection = (value) => {
		actualSelection.splice(actualSelection.indexOf(value), 1)
		setSelectionState([...actualSelection])
	}
	const context = {
		selection: actualSelection,
		disabled,
		onSelect: (value) => {
			if (!disabled) (onSelect || addToSelection)(value)
		},
		onUnselect: (value) => {
			if (!disabled) (onUnselect || removeFromSelection)(value)
		},
	}

	const wrapError =
		error &&
		(typeof error === "string" ||
			(typeof error === "object" && error.type === React.Fragment))

	return (
		<CheckBoxContext.Provider value={context}>
			<Column of="component" {...nextProps}>
				{label && (
					<Text bold style={FormStyles.label} numberOfLines={1}>
						{label}
					</Text>
				)}
				{children}
				{wrapError && (
					<Text error small>
						{error}
					</Text>
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
		</CheckBoxContext.Provider>
	)
}

export function CheckBoxGroupButton({ value, children, ...nextProps }) {
	return (
		<CheckBoxContext.Consumer>
			{({ selection, disabled, onSelect, onUnselect }) => (
				<Row>
					<CheckBox
						{...nextProps}
						disabled={disabled}
						checked={selection.includes(value)}
						onChange={(checked) => {
							if (checked) onSelect(value)
							else onUnselect(value)
						}}
					>
						{children}
					</CheckBox>
				</Row>
			)}
		</CheckBoxContext.Consumer>
	)
}

export function CheckBox(props) {
	const { children, center, label, checked, disabled, onChange } = props
	const [checkedState, setCheckedState] = useState(checked)
	const actualState = onChange ? checked : checkedState

	function toggle() {
		if (!disabled) (onChange || setCheckedState)(!actualState)
	}

	const Check = actualState ? CheckBoxChecked : CheckBoxUnchecked
	const inside = children || <Text>{label}</Text>

	return (
		<TouchableWithoutFeedback
			onPress={toggle}
			hitSlop={Metrics.hitSlop}
			accessibilityRole="checkbox"
		>
			<Row of="inside" valign={center ? "center" : ""}>
				<Check disabled={disabled} style={FormStyles.checkbox_svg} />
				{inside}
			</Row>
		</TouchableWithoutFeedback>
	)
}

export function CheckBoxUnchecked(props) {
	const { disabled, ...nextProps } = props

	return (
		<Svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...nextProps}
		>
			<Rect
				x="3.5"
				y="3.5"
				width="17"
				height="17"
				rx="1.5"
				stroke={disabled ? Colors.inactive : Colors.stroke}
			/>
		</Svg>
	)
}

export function CheckBoxChecked(props) {
	const { disabled, ...nextProps } = props

	return (
		<Svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...nextProps}
		>
			<Rect
				x="3"
				y="3"
				width="18"
				height="18"
				rx="2"
				fill={disabled ? Colors.inactive : Colors.action}
			/>

			<Path
				d="M8 12.75L10.4 15L16 9"
				stroke={Colors.primary_reversed}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

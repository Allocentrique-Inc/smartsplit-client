import React, { useState } from "react"
import { TouchableWithoutFeedback } from "react-native"
import { Svg, Rect, Path } from "react-native-svg"

import { Column, Row } from "../layout"
import { Text } from "../text"
import { Colors, Metrics } from "../theme"
import FormStyles from "../styles/forms"
import { mapChildren, mapFragmentChildren, mapLeaves } from "../utils/react"
import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"

const CheckBoxContext = React.createContext({})
CheckBoxContext.displayName = "CheckBoxGroupContext"
const UNDERTEXT_DEFAULT_LINES = 1

export const CheckBoxGroup = observer((props) => {
	const { t } = useTranslation()
	// console.log(props)
	let {
		label,
		error,
		hideErrorText,
		undertext,
		undertext_lines,
		disabled,
		selection,
		onSelect,
		onUnselect,
		onChange,
		children,
		field,
		...nextProps
	} = props
	if (field) {
		//console.log("checkbox group passed field")
		error = t(field.error)
		label = t(field.label)
		selection = field.value
		onChange = (v) => {
			//console.log(`setting value to ${v}`)
			field.setValue(v)
		}
	}
	const [selectionState, setSelectionState] = useState([])
	const actualSelection = selection || selectionState
	const addToSelection = (value) => {
		if (actualSelection.includes(value)) return
		actualSelection.push(value)
		if (onChange) {
			onChange([...actualSelection])
		} else {
			setSelectionState([...actualSelection])
		}
	}
	const removeFromSelection = (value) => {
		if (!actualSelection.includes(value)) return
		actualSelection.splice(actualSelection.indexOf(value), 1)
		if (onChange) {
			onChange([...actualSelection])
		} else {
			setSelectionState([...actualSelection])
		}
	}
	const context = {
		selection: actualSelection,
		disabled,
		error,
		onSelect: (value) => {
			if (!disabled) (onSelect || addToSelection)(value)
		},
		onUnselect: (value) => {
			if (!disabled) (onUnselect || removeFromSelection)(value)
		},
	}

	const wrapError =
		error &&
		((typeof error === "string" && error.length > 0) ||
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
})

export const CheckBoxGroupButton = observer(
	({ value, children, ...nextProps }) => {
		return (
			<CheckBoxContext.Consumer>
				{({ selection, disabled, error, onSelect, onUnselect }) => (
					<Row>
						<CheckBox
							disabled={disabled}
							{...nextProps}
							color={error && Colors.error}
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
)

export const CheckBox = observer((props) => {
	let {
		children,
		center,
		label,
		checked,
		disabled,
		onChange,
		field,
		color,
	} = props
	if (field) {
		label = field.label
		onChange = (value) => {
			field.setValue(value)
		}
		checked = field.value
	}
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
				<Check
					disabled={disabled}
					style={FormStyles.checkbox_svg}
					color={color}
				/>
				{inside}
			</Row>
		</TouchableWithoutFeedback>
	)
})

export function CheckBoxUnchecked(props) {
	const { disabled, color, ...nextProps } = props
	const actualColor = disabled ? Colors.inactive : color || Colors.stroke

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
				stroke={actualColor}
			/>
		</Svg>
	)
}

export function CheckBoxChecked(props) {
	const { disabled, color, ...nextProps } = props
	const actualColor = disabled ? Colors.inactive : color || Colors.action

	return (
		<Svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...nextProps}
		>
			<Rect x="3" y="3" width="18" height="18" rx="2" fill={actualColor} />

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

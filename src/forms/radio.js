import React, { useState } from "react"
import { View, TouchableWithoutFeedback } from "react-native"
import { Svg, Rect } from "react-native-svg"

import { Column, Row } from "../layout"
import { Text } from "../text"
import { Colors, Metrics } from "../theme"
import FormStyles from "../styles/forms"

const RadioContext = React.createContext({})
RadioContext.displayName = "RadioGroupContext"


export function RadioGroup(props) {
	const { label, value, onChange, disabled, children, ...nextProps } = props
	const [ valueState, setValueState ] = useState()
	const actualValue = onChange ? value : valueState
	
	const context = {
		value: actualValue,
		disabled,
		onChange: function(value) {
			if(!disabled)
				(onChange || setValueState)(value)
		}
	}
	
	let render = children
	
	if(label)
		render = <Column of="component">
			<Text bold style={FormStyles.label} numberOfLines={1}>{label}</Text>
			{render}
		</Column>
	
	return <RadioContext.Provider value={context}>
		{render}
	</RadioContext.Provider>
}

export function RadioGroupButton(props) {
	const { value, ...nextProps } = props
	
	return <RadioContext.Consumer>{function({value, disabled, onChange}) {
		return <RadioButton
			{...nextProps}
			checked={value === props.value}
			disabled={disabled || props.disabled}
			onChange={function() {
				if(onChange)
					onChange(props.value)
				
				if(props.onChange)
					props.onChange(props.value)
			}}
		>{props.children}</RadioButton>
	}}</RadioContext.Consumer>
}


export function RadioButton(props) {
	const { children, label, checked, disabled, onChange } = props
	const [ checkedState, setCheckedState ] = useState(checked)
	const actualState = onChange ? checked : checkedState

	function toggle() {
		if(!disabled)
			(onChange || setCheckedState)(!actualState)
	}

	const inside = children || <Text>{label}</Text>

	return <TouchableWithoutFeedback
		onPress={toggle}
		hitSlop={Metrics.hitSlop}
		accessibilityRole="checkbox"
	>
		<Row of="inside">
			<RadioButtonSvg checked={actualState} disabled={disabled} />
			{inside}
		</Row>
	</TouchableWithoutFeedback>
}


export function RadioButtonSvg(props) {
	const { disabled, checked, ...nextProps } = props
	
	return <Svg
		width="24" height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style={FormStyles.checkbox_svg}
	>
		<Rect
			x="3.5" y="3.5"
			width="17" height="17"
			rx="8.5"
			stroke={disabled ? Colors.inactive : Colors.stroke}
		/>
		
		{checked && <Rect
			x="8" y="8"
			width="8" height="8"
			rx="4"
			fill={disabled ? Colors.inactive : Colors.action}
		/>}
	</Svg>
}

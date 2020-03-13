import React, { useState } from "react"
import { View, TouchableWithoutFeedback } from "react-native"
import Dropdown from "./dropdown"
import { Column, Hairline } from "../layout"
import { Text } from "../text"
import FormStyles from "../styles/forms"

export default function Select(props) {
	const {
		placeholder,
		value,
		initialValue,
		options,
		onChange,
		children,
		...nextProps
	} = props
	
	const [ valueState, setValueState ] = useState(initialValue)
	const dropdownRef = React.createRef()
	const actualValue = value || valueState
	let setDropdownOpen
	
	
	let placeholderElement = options && options.find(o => o.key === actualValue)
	
	if(placeholderElement && placeholderElement.value)
		placeholderElement = placeholderElement.value
	
	if(typeof placeholderElement === "string")
		placeholderElement = <Text style={{flex: 1}}>{placeholderElement}</Text>
	
	if(!placeholderElement)
		placeholderElement = placeholder
	
	
	function handleChange(value) {
		if(onChange)
			onChange(value)
		else
			setValueState(value)
		
		setDropdownOpen(false)
	}
	
	
	return <Dropdown
		{...nextProps}
		dropdownControl={control => setDropdownOpen = control}
		placeholder={placeholderElement}
	>
		<SelectMenu
			options={options}
			onChange={handleChange}
			value={actualValue}
		/>
	</Dropdown>
}

export function SelectMenu(props) {
	return <Column style={FormStyles.select_menu}>
		{props.options.map(option =>
			<SelectItem
				{...option}
				onChange={props.onChange}
				selected={option.key === props.value}
				itemKey={option.key}
			/>
		)}
	</Column>
}

export function SelectItem(props) {
	const { itemKey, value, selected, onChange } = props
	
	function handleSelect() {
		onChange && onChange(itemKey)
	}
	
	return <TouchableWithoutFeedback onPress={handleSelect}>
		<View style={[
			FormStyles.select_item,
			selected && FormStyles.select_item_selected
		]}>
			{typeof value === "string" ? <Text>{value}</Text> : {value}}
		</View>
	</TouchableWithoutFeedback>
}

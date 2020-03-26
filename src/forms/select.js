import React from "react"
import { View, ScrollView, TouchableWithoutFeedback } from "react-native"
import Dropdown from "./dropdown"
import { Column, Hairline } from "../layout"
import { Text } from "../text"
import FormStyles from "../styles/forms"

export default class Select extends React.PureComponent {
	static defaultProps = {
		options: []
	}
	
	constructor(props) {
		super(props)
		this.state = {
			value: props.value || props.initialValue,
			placeholder: this.computePlaceholder(props.value || props.initialValue)
		}
	}
	
	static getDerivedStateFromProps(props, state) {
		if(props.value !== state.value)
			return { value: props.value }
		
		return null
	}
	
	computePlaceholder(selectedValue) {
		const selectedOption = this.props.options.find(o => o.key === selectedValue)
		
		const value = selectedOption
		            ? selectedOption.value
		            : this.props.placeholder
		
		if(typeof value === "string")
			return <Text style={{flex: 1}}>{value}</Text>
		else
			return value
	}
	
	handleChange = (value) => {
		if(this.props.onChange)
			this.props.onChange(value)
		
		this.setState({
			value,
			placeholder: this.computePlaceholder(value)
		})
	}
	
	render() {
		const {
			placeholder,
			value,
			initialValue,
			options,
			onChange,
			children,
			...nextProps
		} = this.props
		
		return <Dropdown {...nextProps} placeholder={this.state.placeholder}>
			<ScrollView style={FormStyles.select_scroll}>
				<SelectMenu
					options={options}
					onChange={this.handleChange}
					value={this.state.value}
				/>
			</ScrollView>
		</Dropdown>
	}
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

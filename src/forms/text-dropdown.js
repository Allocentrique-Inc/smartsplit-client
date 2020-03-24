import React from "react"
import Dropdown from "./dropdown"
import { BasicTextField } from "./text"

export default class TextDropdown extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			focused: props.focused
		}
		
		this.input = React.createRef()
	}
	
	handleOnBlur = () => {
		this.input.current.blur()
		this.setState({focused: false})
		
		if(this.props.onBlur)
			this.props.onBlur()
	}
	
	handleOnFocus = () => {
		this.input.current.focus()
		this.setState({focused: true})
		
		if(this.props.onFocus)
			this.props.onFocus()
	}
	
	render() {
		const {
			placeholder,
			children,
			inputProps,
			onFocus,
			onBlur,
			onChangeText,
			onKeyPress,
			...nextProps
		} = this.props
		
		const searchInput = <BasicTextField
			placeholder={placeholder}
			onChangeText={onChangeText}
			onKeyPress={onKeyPress}
			onBlur={this.handleOnBlur}
			onFocus={this.handleOnFocus}
			viewRef={this.input}
			{...inputProps}
		/>
		
		return <Dropdown
			{...nextProps}
			placeholder={searchInput}
			open={this.state.focused}
			onBlur={this.handleOnBlur}
			onFocus={this.handleOnFocus}
		>
			{children}
		</Dropdown>
	}
}

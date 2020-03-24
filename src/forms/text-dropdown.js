import React, { useState } from "react"
import Dropdown from "./dropdown"
import { BasicTextField } from "./text"

export default function TextDropdown(props) {
	const {
		placeholder,
		currentItem,
		children,
		inputProps,
		onFocus,
		onBlur,
		onChangeText,
		onKeyPress,
		...nextProps
	} = props
	
	const [focused, setFocused] = useState(false)
	const inputRef = React.createRef()
	
	function handleOnFocus(event) {
		console.log("FOCUS", event)
		
		inputRef.current.focus()
		
		if(onFocus)
			onFocus()
		
		setFocused(true)
	}
	
	function handleOnBlur(event) {
		console.log("BLUR", event)
		
		inputRef.current.blur()
		
		if(onBlur)
			onBlur()
		
		setFocused(false)
	}
	
	const searchInput = <BasicTextField
		placeholder={placeholder}
		onChangeText={onChangeText}
		onKeyPress={onKeyPress}
		onBlur={handleOnBlur}
		onFocus={handleOnFocus}
		viewRef={inputRef}
		{...inputProps}
	/>
	
	return <Dropdown
		{...nextProps}
		placeholder={searchInput}
		onOpenClose={setFocused}
		open={focused}
		onBlur={handleOnBlur}
		onFocus={handleOnFocus}
	>
		{children}
	</Dropdown>
}

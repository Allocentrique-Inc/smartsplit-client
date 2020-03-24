import React, { useState } from "react"
import Dropdown from "../widgets/dropdown"
import Label from "./label"
import Frame from "./frame"
import { Metrics } from "../theme"

export default function DropdownField(props) {
	const {
		label,
		label_hint,
		undertext,
		children,
		onFocus,
		onBlur,
		...nextProps
	} = props
	const [ focused, setFocused ] = useState(false)
	const actualFocused = props.open !== undefined ? props.open : focused
	
	function handleOnFocus() {
		if(onFocus)
			onFocus()
		
		if(props.open === undefined)
			setFocused(true)
	}
	
	function handleOnBlur() {
		if(onBlur)
			onBlur()
		
		if(props.open === undefined)
			setFocused(false)
	}
	
	return <Label {...props}>
		<Frame focused={actualFocused}> 
			<Dropdown
				{...nextProps}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
				positionAdjust={{
					x: -Metrics.spacing.inside - 1,
					y: Metrics.spacing.inside - Metrics.borderRadius.forms,
					width: 2* Metrics.spacing.inside + 2
				}}
			>
				{children}
			</Dropdown>
		</Frame>
	</Label>
}

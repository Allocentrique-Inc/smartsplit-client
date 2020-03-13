import React, { useState } from "react"
import Dropdown from "../widgets/dropdown"
import Label from "./label"
import Frame from "./frame"
import { Metrics } from "../theme"

export default function DropdownField(props) {
	const { label, label_hint, undertext, children, ...nextProps } = props
	const [ focused, setFocused ] = useState(false)
	
	return <Label {...props}>
		<Frame focused={focused}> 
			<Dropdown
				{...nextProps}
				onOpenClose={setFocused}
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

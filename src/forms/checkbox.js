import React, { useState } from "react"
import { TouchableWithoutFeedback } from "react-native"
import { Svg, Rect, Path } from "react-native-svg"

import { Row } from "../layout"
import { Text } from "../text"
import { Colors, Metrics } from "../theme"

export default function CheckBox(props) {
	const { children, label, checked, disabled, onChange } = props
	const [ checkedState, setCheckedState ] = useState(checked)
	const actualState = onChange ? checked : checkedState

	function toggle() {
		if(!disabled)
			(onChange || setCheckedState)(!actualState)
	}

	const Check = actualState ? CheckBoxChecked : CheckBoxUnchecked
	const inside = children || <Text>{label}</Text>

	return <TouchableWithoutFeedback
		onPress={toggle}
		hitSlop={Metrics.hitSlop}
		accessibilityRole="checkbox"
	>
		<Row of="inside">
			<Check disabled={disabled} />
			{inside}
		</Row>
	</TouchableWithoutFeedback>
}


export function CheckBoxUnchecked(props) {
	const { disabled, ...nextProps } = props

	return <Svg
		width="24" height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...nextProps}
	>
		<Rect
			x="3.5" y="3.5"
			width="17" height="17"
			rx="1.5"
			stroke={disabled ? Colors.inactive : Colors.stroke}
		/>
	</Svg>
}


export function CheckBoxChecked(props) {
	const { disabled, ...nextProps } = props

	return <Svg
		width="24" height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...nextProps}
	>
		<Rect
			x="3" y="3"
			width="18" height="18"
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
}

import React from "react"
import { Svg, Path, Circle, Text, Symbol, Use } from "react-native-svg"
import { Colors } from "../theme"

export default function Badge(props) {
	const { value } = props
	const color = props.color || Colors.error
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24">
			<Circle cx="12" cy="12" r="12" fill={color} />
			<Text x="7.5" y="17" stroke="white" fill="white">
				{value}
			</Text>
		</Svg>
	)
}

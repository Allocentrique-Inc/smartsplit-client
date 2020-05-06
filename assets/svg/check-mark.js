import React from "react"
import { Svg, Path } from "react-native-svg"
import { Colors } from "../../src/theme"

export default function CheckMark(props) {
	const color = props.color || Colors.tertiary
	return (
		<Svg
			width="18"
			height="13"
			viewBox="0 0 18 13"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				d="M17 1L6 12L1 7"
				stroke="#8DA0B3"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Svg>
	)
}

import React from "react"
import { Svg, Path } from "react-native-svg"
import { Colors } from "../theme"

export default function CheckMark(props) {
	const color = props.color || Colors.tertiary
	return (
		<Svg
			width="500"
			height="500"
			viewBox="0 0 500 500"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				d="M20 6L9 17L4 12"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

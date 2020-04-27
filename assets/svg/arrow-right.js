import React from "react"
import { Svg, Path } from "react-native-svg"
import { Colors } from "../../src/theme"

export default function (props) {
	const color = props.color || Colors.tertiary

	return (
		<Svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				d="M9 18L15 12L9 6"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

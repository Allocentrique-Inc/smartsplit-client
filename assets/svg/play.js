import React from "react"
import { Svg, Path } from "react-native-svg"
import { Colors } from "../../src/theme"

export default function PlayIcon(props) {
	const color = props.color || Colors.stroke

	return (
		<Svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				d="M6 3L20 12L6 21V3Z"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

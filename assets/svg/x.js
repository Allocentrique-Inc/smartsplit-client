import React from "react"
import { Svg, Path } from "react-native-svg"
import { Metrics, Colors } from "../../src/theme"

export default function XIcon(props) {
	const color = props.color || Colors.tertiary
	const size = Metrics.size[props.size] || Metrics.size.small

	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				d="M18 6L6 18"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>

			<Path
				d="M6 6L18 18"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

import React from "react"
import { Svg, Path } from "react-native-svg"

export default function ArrowLeft(props) {
	return (
		<Svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				d="M20 12H4"
				stroke="#8DA0B3"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<Path
				d="M10 18L4 12L10 6"
				stroke="#8DA0B3"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Svg>
	)
}

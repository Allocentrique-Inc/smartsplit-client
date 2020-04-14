import React from "react"
import { Svg, Path } from "react-native-svg"

export default function PenIcon(props) {
	return (
		<Svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				d="M16 3L21 8L8 21H3V16L16 3Z"
				stroke="#8DA0B3"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M13 6L18 11"
				stroke="#8DA0B3"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

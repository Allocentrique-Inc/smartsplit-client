import React from "react"
import { Svg, Path } from "react-native-svg"

export default function LogoAddSquare(props) {
	return (
		<Svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				d="M0 2C0 0.89543 0.895431 0 2 0H22C23.1046 0 24 0.895431 24 2V22C24 23.1046 23.1046 24 22 24H2C0.89543 24 0 23.1046 0 22V2Z"
				fill="#2DA84F"
			/>

			<Path
				d="M12 7.33334V16.6667"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>

			<Path
				d="M7.33337 12H16.6667"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

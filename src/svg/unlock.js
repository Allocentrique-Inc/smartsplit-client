import React from "react"
import { Svg, Path } from "react-native-svg"

export default function LockIcon(props) {
	const color = props.color || "#8DA0B3"

	return (
		<Svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				d="M18 11H6C4.89543 11 4 11.8954 4 13V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V13C20 11.8954 19.1046 11 18 11Z"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M7 11V7.00003C6.99876 5.76008 7.45828 4.5639 8.28938 3.6437C9.12047 2.7235 10.2638 2.14493 11.4975 2.02032C12.7312 1.89571 13.9671 2.23393 14.9655 2.96934"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

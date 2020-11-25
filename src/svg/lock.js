import React from "react"
import { Svg, Path } from "react-native-svg"
import { Colors } from "../theme"

export default function LockIcon(props) {
	const color = props.color || Colors.inactive

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
				d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

import React from "react"
import { Svg, Path } from "react-native-svg"
import { Colors } from "../theme"

export default function UnlockDownload(props) {
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
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V11C8 11.5523 7.55228 12 7 12C6.44772 12 6 11.5523 6 11V7C6 5.4087 6.63214 3.88258 7.75736 2.75736C8.88258 1.63214 10.4087 1 12 1C13.5913 1 15.1174 1.63214 16.2426 2.75736C16.6332 3.14788 16.6332 3.78105 16.2426 4.17157C15.8521 4.5621 15.219 4.5621 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3Z"
				fill={color}
			/>
			<Path
				d="M18 11H6C4.89543 11 4 11.8954 4 13V20C4 21.1046 4.89543 22 6 22H8H16H18C19.1046 22 20 21.1046 20 20V13C20 11.8954 19.1046 11 18 11Z"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M12 12V19M12 19L15 16M12 19L9 16"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

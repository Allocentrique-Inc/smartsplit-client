import React from "react"
import { Svg, Path } from "react-native-svg"

export default function UnlockDownloadIcon(props) {
	return (
		<Svg
			width="25"
			height="24"
			viewBox="0 0 25 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.5 3C11.4391 3 10.4217 3.42143 9.67157 4.17157C8.92143 4.92172 8.5 5.93913 8.5 7V11C8.5 11.5523 8.05228 12 7.5 12C6.94772 12 6.5 11.5523 6.5 11V7C6.5 5.4087 7.13214 3.88258 8.25736 2.75736C9.38258 1.63214 10.9087 1 12.5 1C14.0913 1 15.6174 1.63214 16.7426 2.75736C17.1332 3.14788 17.1332 3.78105 16.7426 4.17157C16.3521 4.5621 15.719 4.5621 15.3284 4.17157C14.5783 3.42143 13.5609 3 12.5 3Z"
				fill="#8DA0B3"
			/>
			<Path
				d="M18.5 11H6.5C5.39543 11 4.5 11.8954 4.5 13V20C4.5 21.1046 5.39543 22 6.5 22H8.5H16.5H18.5C19.6046 22 20.5 21.1046 20.5 20V13C20.5 11.8954 19.6046 11 18.5 11Z"
				stroke="#8DA0B3"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M12.5 12V19M12.5 19L15.5 16M12.5 19L9.5 16"
				stroke="#8DA0B3"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

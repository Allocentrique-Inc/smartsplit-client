import React from "react"
import { Svg, Path } from "react-native-svg"
import { Colors } from "../theme"
import { getSize } from "../utils/utils"

export default function CircledP(props) {
	const color = props.color || Colors.stroke
	const size = getSize(props.size, 128)
	const scale = size / 128
	return (
		<Svg
			width={size}
			height={size}
			viewBox={`0 0 24 24`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM9 6C8.73478 6 8.48043 6.10536 8.29289 6.29289C8.10536 6.48043 8 6.73478 8 7V17C8 17.5523 8.44772 18 9 18C9.55229 18 10 17.5523 10 17V14H13C15.2091 14 17 12.2091 17 10C17 7.79086 15.2091 6 13 6H9ZM13 12H10V8H13C14.1046 8 15 8.89543 15 10C15 11.1046 14.1046 12 13 12Z"
				fill={color}
			/>
		</Svg>
	)
}

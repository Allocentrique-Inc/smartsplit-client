import React from "react"
import { Svg, Path } from "react-native-svg"
import { Colors } from "../theme"

export default function Hourglass(props) {
	const color = props.color || Colors.tertiary
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
				d="M6.76172 1C6.20943 1 5.76172 1.44772 5.76172 2V6C5.76172 6.26368 5.86586 6.51669 6.05148 6.70396L11.3007 12L6.05148 17.296C5.86586 17.4833 5.76172 17.7363 5.76172 18L5.76172 22C5.76172 22.5523 6.20943 23 6.76172 23L18.6556 23C19.2079 23 19.6556 22.5523 19.6556 22V18C19.6556 17.7363 19.5515 17.4833 19.3659 17.296L14.1167 12L19.3659 6.70396C19.5515 6.51669 19.6556 6.26368 19.6556 6V2C19.6556 1.44772 19.2079 1 18.6556 1H6.76172ZM7.76172 5.58838V3H17.6556V5.58839L12.7087 10.5795L7.76172 5.58838ZM17.6556 18.4116V21L7.76172 21L7.76172 18.4116L12.7087 13.4205L17.6556 18.4116Z"
				fill={color}
			/>
		</Svg>
	)
}

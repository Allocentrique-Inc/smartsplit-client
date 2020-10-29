import React from "react"
import { Svg, Path } from "react-native-svg"
import { Colors } from "../theme"

export default function RecordingIcon(props) {
	const color = props.color || Colors.action
	const { ...nextProps } = props

	return (
		<Svg
			{...nextProps}
			width="22"
			height="22"
			viewBox="0 0 22 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11ZM11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0ZM8 5C7.73478 5 7.48043 5.10536 7.29289 5.29289C7.10536 5.48043 7 5.73478 7 6V16C7 16.5523 7.44772 17 8 17C8.55229 17 9 16.5523 9 16V13H12C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5H8ZM12 11H9V7H12C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11Z"
				fill={color}
			/>
		</Svg>
	)
}

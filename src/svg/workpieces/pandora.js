import React from "react"
import { Svg, Path } from "react-native-svg"
import { Colors } from "../../theme"

export default function PandoraIcon(props) {
	const color = props.color || Colors.tertiary
	const { ...nextProps } = props

	return (
		<Svg
			{...nextProps}
			width="8"
			height="8"
			viewBox="0 0 8 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4 8C6.20914 8 8 6.20914 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4C0 6.20914 1.79086 8 4 8Z"
				fill={color}
			/>
		</Svg>
	)
}

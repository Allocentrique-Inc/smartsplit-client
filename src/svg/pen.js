import React from "react"
import { View } from "react-native"
import { Svg, Path } from "react-native-svg"
import { Colors, Metrics } from "../theme"
import MetricsStyles from "../styles/metrics"
//import { Colors } from "react-native/Libraries/NewAppScreen"

export default function PenIcon(props, { size }) {
	const color = props.color || Colors.tertiary
	const sizeStyle =
		size in Metrics.size ? Metrics.size[size] : Metrics.size.tiny

	return (
		<View style={sizeStyle}>
			<Svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					d="M16 3L21 8L8 21H3V16L16 3Z"
					stroke={color}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<Path
					d="M13 6L18 11"
					stroke={color}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	)
}

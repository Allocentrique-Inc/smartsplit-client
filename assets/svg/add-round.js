import React from "react"
import { StyleSheet, View } from "react-native"
import { Svg, Path, Rect } from "react-native-svg"
import { Colors, Metrics } from "../../src/theme"

const AddButtonStyles = StyleSheet.create({
	button_container: {
		backgroundColor: Colors.active,
		alignItems: "center",
		justifyContent: "center",
	},
})

AddButtonStyles.button_size = {}

for (let size in Metrics.size) {
	AddButtonStyles.button_size[size] = {
		width: Metrics.size[size],
		height: Metrics.size[size],
		borderRadius: Metrics.size[size] / 2,
	}
}

export default function LogoAddRound(props) {
	const sizeStyle =
		props.size in AddButtonStyles.button_size
			? AddButtonStyles.button_size[props.size]
			: AddButtonStyles.button_size.medium

	const small = ["small", "xsmall", "tiny"].includes(props.size)
	return (
		<View style={[AddButtonStyles.button_container, sizeStyle]}>
			<Svg
				width="56"
				height="56"
				viewBox="0 0 120 120"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Rect x="32" y="24" width="56" height="56" rx="28" fill="#2DA84F" />

				<Path
					d="M60 45V59"
					stroke="white"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<Path
					d="M53 52H67"
					stroke="white"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	)
}

import React from "react"
import { View } from "react-native"
import DefaultImage from "../../svg/default-image"
import { Colors, Metrics } from "../../theme"

const Style = {
	width: Metrics.size.medium,
	height: Metrics.size.medium,
	backgroundColor: Colors.background.hell,
	alignItems: "center",
	justifyContent: "center",
	borderRadius: Metrics.borderRadius.forms,
}

export default function AlbumArt({ Image, style, ...nextProps }) {
	const Svg = Image ? Image : DefaultImage
	return (
		<View style={[Style, style]} {...nextProps}>
			<Svg />
		</View>
	)
}

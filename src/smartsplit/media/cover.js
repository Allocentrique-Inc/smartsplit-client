import React from "react"
import { View } from "react-native"
import ImageIcon from "../../svg/image"
import MetricsStyles from "../../styles/metrics"
import { Colors, Metrics } from "../../theme"

export default function Cover(props, { size }) {
	const sizeStyle =
		size in Metrics.size ? Metrics.size[size] : Metrics.size.medium

	return (
		<View style={[MetricsStyles.cover, props.style, sizeStyle]}>
			<ImageIcon color={Colors.stroke} />
		</View>
	)
}

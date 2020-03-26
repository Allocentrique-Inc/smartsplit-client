import React from "react"
import { View, StyleSheet } from "react-native"
import { Metrics, Colors } from "../theme"

export const Styles = StyleSheet.create({
	bar: {
		borderRadius: Metrics.borderRadius.forms,
		backgroundColor: Colors.stroke,
		height: Metrics.spacing.small,
		flexDirection: "row",
		alignItems: "stretch",
		height: Metrics.size.medium / 4
	},

	progress: {
		borderRadius: Metrics.borderRadius.forms,
		backgroundColor: Colors.action,
	},
})

function roundProgress(progress) {
	return Math.round(progress * 100) / 100
}

export default function ProgressBar(props) {
	const progressPercent = roundProgress(props.progress) + "%"
	const height = Metrics.size[props.size || "medium"] / 2
	const color = props.color || Colors.action
	
	const barStyles = {
		width: progressPercent,
		backgroundColor: color,
	}

	return <View style={[Styles.bar, {height}]}>
		<View style={[Styles.progress, barStyles]} />
	</View>
}

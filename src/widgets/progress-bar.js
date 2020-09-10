import React from "react"
import { View, StyleSheet } from "react-native"
import { Metrics, Colors } from "../theme"
import { observer } from "mobx-react"
export const Styles = StyleSheet.create({
	bar: {
		borderRadius: Metrics.borderRadius.forms,
		backgroundColor: Colors.stroke,
		flexDirection: "row",
		alignItems: "stretch",
		height: Metrics.size.medium / 4,
	},

	progress: {
		borderRadius: Metrics.borderRadius.forms,
		backgroundColor: Colors.action,
	},
})

function roundProgress(progress) {
	return Math.round(progress * 100) / 100
}

const ProgressBar = observer(function (props) {
	const progressPercent = roundProgress(props.progress) + "%"
	const height = Metrics.size[props.size || "medium"] / 2
	const color = props.color || Colors.action

	const barStyles = {
		width: progressPercent,
		backgroundColor: color,
	}

	return (
		<View style={[Styles.bar, { height }, props.style]}>
			<View style={[Styles.progress, barStyles]} />
		</View>
	)
})
export default ProgressBar

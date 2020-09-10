import React from "react"
import { Column } from "../layout"
import { Colors, Metrics } from "../theme"
import { StyleSheet } from "react-native"

export const CardStyles = StyleSheet.create({
	frame: {
		borderRadius: Metrics.borderRadius.modals,
	},
	frame_neutral: {
		backgroundColor: Colors.background.ground,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: Colors.stroke,
	},
})

export default function Card({ style, children }) {
	return (
		<Column
			of="component"
			padding="component"
			layer="overground_moderate"
			style={[CardStyles.frame, CardStyles.frame_neutral, style]}
		>
			{children}
		</Column>
	)
}

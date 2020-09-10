import React from "react"
import { Column } from "../layout"
import { Colors, Metrics } from "../theme"

const cardStyle = {
	backgroundColor: Colors.background.ground,
	width: 304,
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: Colors.stroke,
	borderRadius: Metrics.borderRadius.modals,
}

export default function Card({ style, children }) {
	return (
		<Column
			of="component"
			padding="component"
			layer="overground_moderate"
			style={[cardStyle, style]}
		>
			{children}
		</Column>
	)
}

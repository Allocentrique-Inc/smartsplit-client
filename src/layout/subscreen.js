import React from "react"

import { Column } from "../layout"
import { StyleSheet } from "react-native"
import Scrollable from "../widgets/scrollable"
import { Navbar } from "../smartsplit/components/navbar"
import { Metrics } from "../theme"

const LayoutStyle = StyleSheet.create({
	outer_container: {
		paddingLeft: Metrics.spacing.medium,
		paddingRight: Metrics.spacing.medium,
	},

	inner_container: {
		maxWidth: Metrics.maxContentWidth,
		width: "100%",
		flex: 1,
	},
})

export default function SubScreenLayout(props) {
	const { title, onBack, actions, children } = props

	return (
		<>
			<Navbar title={title} onBack={onBack} actions={actions} />
			<Scrollable>
				<Column align="center" style={LayoutStyle.outer_container}>
					<Column style={LayoutStyle.inner_container}>{children}</Column>
				</Column>
			</Scrollable>
		</>
	)
}

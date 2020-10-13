import React from "react"

import { Column } from "../layout"
import { StyleSheet } from "react-native"
import Scrollable from "../widgets/scrollable"
import { Navbar } from "../smartsplit/components/navbar"
import { Metrics } from "../theme"

const Styles = StyleSheet.create({
	innerContainer: {
		maxWidth: Metrics.maxContentWidth,
		width: "100%",
		flex: 1,
		alignSelf: "center",
		paddingRight: Metrics.spacing.small,
	},
	outerContainer: {
		height: "100%",
	},
})

export default function SubScreenLayout({
	title,
	onBack,
	actions,
	style,
	children,
}) {
	return (
		<Column style={[Styles.outerContainer, style]}>
			<Navbar title={title} onBack={onBack} actions={actions} />
			<Scrollable>
				<Column style={Styles.innerContainer}>{children}</Column>
			</Scrollable>
		</Column>
	)
}

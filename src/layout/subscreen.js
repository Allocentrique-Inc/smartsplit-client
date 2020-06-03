import React from "react"

import { Column } from "../layout"
import { StyleSheet } from "react-native"
import Scrollable from "../widgets/scrollable"
import { Navbar } from "../smartsplit/components/navbar"
import { Metrics } from "../theme"

const LayoutStyle = StyleSheet.create({
	inner_container: {
		maxWidth: Metrics.maxContentWidth,
		width: "100%",
		flex: 1,
		alignSelf: "center",
	},
})

export default function SubScreenLayout(props) {
	const { title, onBack, actions, children } = props

	return (
		<>
			<Navbar title={title} onBack={onBack} actions={actions} />
			<Scrollable>
				<Column style={LayoutStyle.inner_container}>{children}</Column>
			</Scrollable>
		</>
	)
}

import React from "react"
import { Column } from "../layout"
import { Heading } from "../text"
import Scrollable from "../widgets/scrollable"
import { Navbar } from "../smartsplit/components/navbar"
import { Metrics } from "../theme"

export default function SubScreenLayout(props) {
	const { title, onBack, actions, children } = props

	return (
		<>
			<Navbar title={title} onBack={onBack} actions={actions} />
			<Scrollable>
				<Column
					align="center"
					style={{
						paddingLeft: Metrics.spacing.medium,
						paddingRight: Metrics.spacing.medium,
						paddingTop: Metrics.spacing.section,
						paddingBottom: Metrics.spacing.section,
					}}
				>
					<Column
						style={{
							maxWidth: Metrics.maxContentWidth,
							width: "100%",
							flex: 1,
						}}
					>
						{children}
					</Column>
				</Column>
			</Scrollable>
		</>
	)
}

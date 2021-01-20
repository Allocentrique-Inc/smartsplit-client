import React, { useState } from "react"
import { TouchableWithoutFeedback, StyleSheet } from "react-native"
import { Row } from "../../layout"
import ArrowLeft from "../../svg/arrow-left"
import { View } from "react-native"
import { Metrics } from "../../theme"
import { Text } from "../../text"

const Styles = StyleSheet.create({
	outerContainer: {
		paddingTop: Metrics.spacing.medium,
		paddingBottom: Metrics.spacing.medium,
		paddingRight: Metrics.spacing.small,
		paddingLeft: Metrics.spacing.small,
	},
	innerContainer: {
		maxWidth: 944,
		width: "100%",
		flex: 1,
	},
})

export function Navbar({ title, onBack, actions, style }) {
	return (
		<Row of="component" align="center" style={[Styles.outerContainer, style]}>
			<Row style={Styles.innerContainer} of="component" valign="center">
				<TouchableWithoutFeedback onPress={onBack}>
					<View>
						<ArrowLeft />
					</View>
				</TouchableWithoutFeedback>
				<Row of="component" valign="center">
					<Text>{title}</Text>
				</Row>
				<View style={{ marginLeft: "auto" }}>{actions}</View>
			</Row>
		</Row>
	)
}

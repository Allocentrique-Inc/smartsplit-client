import React from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Colors, Metrics } from "../theme"
import { ButtonStyles } from "./button"
import XIcon from "../../assets/svg/x"
import { Row } from "../layout"

const TagStyle = StyleSheet.create({
	frame: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		backgroundColor: Colors.background.underground,
		marginRight: Metrics.spacing.small,
		marginBottom: Metrics.spacing.small,
	},

	frame_medium: {
		borderRadius: Metrics.borderRadius.forms,
		height: Metrics.size.medium,
		paddingTop: Metrics.spacing.small,
		paddingBottom: Metrics.spacing.small,
		paddingLeft: Metrics.spacing.medium,
		paddingRight: Metrics.spacing.medium,
	},

	frame_small: {
		borderRadius: Metrics.borderRadius.forms,
		height: Metrics.size.small,
		paddingTop: Metrics.spacing.tiny,
		paddingBottom: Metrics.spacing.tiny,
		paddingLeft: Metrics.spacing.small,
		paddingRight: Metrics.spacing.small,
	},

	frame_alert_positive: {
		backgroundColor: Colors.secondaries.green,
	},

	frame_alert_negative: {
		backgroundColor: Colors.pochette,
	},

	text_container: {
		flexGrow: 1,
		flexShrink: 0,
		alignItems: "center",
		justifyContent: "center",
	},

	text_alert_positive: {
		color: Colors.action,
	},

	text_alert_negative: {
		color: Colors.error,
	},
})

export function Tag({ size, small, dismissible, onClick, style, children }) {
	const frameStyle = [TagStyle.frame]
	const addFrame = (key) => frameStyle.push(ButtonStyles[key])
	if (small || size === "small") {
		addFrame("frame_small")
	} else {
		addFrame("frame_medium")
	}

	const handleClick = () => {
		onClick && onClick()
	}
	return (
		<Row of="component" style={[frameStyle, style]}>
			<View style={TagStyle.text_container}>{children}</View>
			{dismissible && (
				<TouchableWithoutFeedback onPress={handleClick}>
					<View>
						<XIcon />
					</View>
				</TouchableWithoutFeedback>
			)}
		</Row>
	)
}

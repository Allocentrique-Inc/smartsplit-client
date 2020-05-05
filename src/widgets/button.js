import React from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Text } from "../text"
import { Row } from "../layout"
import { Colors, Metrics } from "../theme"

export const ButtonStyles = StyleSheet.create({
	frame: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},

	frame_large: {
		borderRadius: Metrics.borderRadius.forms,
		height: Metrics.size.large,
		paddingTop: Metrics.spacing.medium,
		paddingBottom: Metrics.spacing.medium,
		paddingLeft: Metrics.spacing.large,
		paddingRight: Metrics.spacing.large,
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

	frame_icon: {
		paddingLeft: Metrics.spacing.small,
		paddingRight: Metrics.spacing.small,
	},

	frame_primary: {
		backgroundColor: Colors.action,
	},

	frame_secondary: {
		borderColor: Colors.action,
		borderWidth: 1,
	},

	frame_error: {
		borderColor: Colors.error,
		borderWidth: 1,
	},

	text_container: {
		flexGrow: 1,
		flexShrink: 0,
		alignItems: "center",
		justifyContent: "center",
	},

	text_primary: {
		color: Colors.primary_reversed,
	},

	text_secondary: {
		color: Colors.action,
	},

	frame_disabled: {
		backgroundColor: Colors.background.hell,
		borderWidth: 0,
	},

	text_disabled: {
		color: Colors.inactive,
	},

	text_error: {
		color: Colors.error,
	},

	frame_mega_error: {
		backgroundColor: Colors.error,
	},
})

ButtonStyles.frame_round = {}

for (let size in Metrics.size) {
	ButtonStyles.frame_round[size] = {
		width: Metrics.size[size],
		height: Metrics.size[size],
		borderRadius: Metrics.size[size] / 2,
	}
}

ButtonStyles.frame_round = StyleSheet.create(ButtonStyles.frame_round)

export function Button({
	size,
	large,
	small,
	icon,
	text,
	primary,
	secondary,
	tertiary,
	disabled,
	error,
	megaError,
	onClick,
	style,
	children,
	viewRef,
}) {
	const frameStyle = [ButtonStyles.frame]
	const textStyle = []
	let content = children

	const addFrame = (key) => frameStyle.push(ButtonStyles[key])
	const addText = (key) => textStyle.push(ButtonStyles[key])

	if (large || size === "large") {
		addFrame("frame_large")
	} else if (small || size === "small") {
		addFrame("frame_small")
	} else {
		addFrame("frame_medium")
	}

	if (icon && !text && !content) {
		addFrame("frame_icon")
	} else if (disabled) {
		addFrame("frame_disabled")
		addText("text_disabled")
	} else if (primary) {
		addFrame("frame_primary")
		addText("text_primary")
	} else if (secondary) {
		addFrame("frame_secondary")
		addText("text_secondary")
	} else if (tertiary) {
		addText("text_secondary")
	} else if (error) {
		addFrame("frame_error")
		addText("text_error")
	} else if (megaError) {
		addFrame("frame_mega_error")
		addText("text_primary")
	} else {
		addFrame("frame_primary")
		addText("text_primary")
	}

	if (!content) {
		content = (
			<Row of="component" style={[frameStyle, style]} viewRef={viewRef}>
				{icon}
				{text && (
					<View style={ButtonStyles.text_container}>
						<Text heavy small={small} style={textStyle}>
							{text}
						</Text>
					</View>
				)}
			</Row>
		)
	}

	const handleClick = () => {
		!disabled && onClick && onClick()
	}

	return (
		<TouchableWithoutFeedback onPress={handleClick}>
			{content}
		</TouchableWithoutFeedback>
	)
}

export function RoundButton(props) {
	const buttonStyles = [
		ButtonStyles.frame,
		ButtonStyles.frame_primary,
		ButtonStyles.frame_round[props.size] || ButtonStyles.frame_round.medium,
	]

	return (
		<TouchableWithoutFeedback onPress={props.onClick}>
			<View style={buttonStyles}>{props.children}</View>
		</TouchableWithoutFeedback>
	)
}

export default Button

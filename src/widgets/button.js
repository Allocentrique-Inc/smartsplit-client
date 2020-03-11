import React from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Text } from "../text"
import { Colors, Metrics } from "../theme"

export const ButtonStyles = StyleSheet.create({
	frame: {
		borderRadius: Metrics.borderRadius.forms,
		height: Metrics.size.medium,
		paddingTop: Metrics.spacing.small,
		paddingBottom: Metrics.spacing.small,
		paddingLeft: Metrics.spacing.medium,
		paddingRight: Metrics.spacing.medium,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},

	frame_small: {
		borderRadius: Metrics.borderRadius.forms,
		height: Metrics.size.small,
		paddingTop: Metrics.spacing.tiny,
		paddingBottom: Metrics.spacing.tiny,
		paddingLeft: Metrics.spacing.small,
		paddingRight: Metrics.spacing.small,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
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
		borderWidth: 1
	},

	text_primary: {
		color: Colors.primary_reversed
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
})

export default function Button(props) {
	let frameStyle = [ButtonStyles[props.small ? "frame_small" : "frame"]]
	let textStyle  = []
	let content    = props.children

	if(props.icon && !props.text && !content) {
		frameStyle.push(ButtonStyles.frame_icon)
	}
	else if(props.disabled) {
		frameStyle.push(ButtonStyles.frame_disabled)
		textStyle.push(ButtonStyles.text_disabled)
	}
	else if(props.primary) {
		frameStyle.push(ButtonStyles.frame_primary)
		textStyle.push(ButtonStyles.text_primary)
	}
	else if(props.secondary) {
		frameStyle.push(ButtonStyles.frame_secondary)
		textStyle.push(ButtonStyles.text_secondary)
	}
	else if(props.tertiary) {
		textStyle.push(ButtonStyles.text_secondary)
	}
	else {
		frameStyle.push(ButtonStyles.frame_primary)
		textStyle.push(ButtonStyles.text_primary)
	}

	if(!content) {
		content = <>
			{props.icon}
			{props.text && <Text
				heavy
				small={props.small}
				style={textStyle}
			>{props.text}</Text>}
		</>
	}

	return <TouchableWithoutFeedback onPress={props.onClick}>
		<View style={[frameStyle, props.style]} onClick={props.onClick}>
			{content}
		</View>
	</TouchableWithoutFeedback>
}

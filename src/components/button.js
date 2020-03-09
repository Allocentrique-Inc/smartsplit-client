import React from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Text } from "../views/text"
import { Colors, Metrics } from "../theme"

export const Styles = StyleSheet.create({
	frame: {
		borderRadius: Metrics.borderRadius.forms,
		height: Metrics.size.medium,
		paddingTop: Metrics.spacing.small,
		paddingBottom: Metrics.spacing.small,
		paddingLeft: Metrics.spacing.medium,
		paddingRight: Metrics.spacing.medium,
		alignItems: "center",
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
		flexDirection: "row",
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
	let frameStyle = [props.small ? Styles.frame_small : Styles.frame]
	let textStyle  = []
	let content    = props.children

	if(props.disabled) {
		frameStyle.push(Styles.frame_disabled)
		textStyle.push(Styles.text_disabled)
	}
	else if(props.primary) {
		frameStyle.push(Styles.frame_primary)
		textStyle.push(Styles.text_primary)
	}
	else if(props.secondary) {
		frameStyle.push(Styles.frame_secondary)
		textStyle.push(Styles.text_secondary)
	}
	else if(props.tertiary) {
		textStyle.push(Styles.text_secondary)
	}
	else {
		frameStyle.push(Styles.frame_primary)
		textStyle.push(Styles.text_primary)
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

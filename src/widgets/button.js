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
		borderWidth: 1
	},
	
	text_container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
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

ButtonStyles.frame_round = {}

for(let size in Metrics.size) {
	ButtonStyles.frame_round[size] = {
		width:  Metrics.size[size],
		height: Metrics.size[size],
		borderRadius: Metrics.size[size] / 2,
	}
}
		
ButtonStyles.frame_round = StyleSheet.create(ButtonStyles.frame_round)


export function Button(props) {
	let frameStyle = [
		ButtonStyles.frame,
		ButtonStyles[props.small ? "frame_small" : "frame_medium"]
	]
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
			{props.text && <View style={ButtonStyles.text_container}>
				<Text
					heavy
					small={props.small}
					style={textStyle}
				>{props.text}</Text>
			</View>}
		</>
	}

	return <TouchableWithoutFeedback onPress={props.onClick}>
		<Row of="component" style={[frameStyle, props.style]}>
			{content}
		</Row>
	</TouchableWithoutFeedback>
}

export function RoundButton(props) {
	const buttonStyles = [
		ButtonStyles.frame,
		ButtonStyles.frame_primary,
		ButtonStyles.frame_round[props.size] || ButtonStyles.frame_round.medium
	]
	
	return <TouchableWithoutFeedback onPress={props.onClick}>
		<View style={buttonStyles}>{props.children}</View>
	</TouchableWithoutFeedback>
}

export default Button

import React, { useState } from "react"
import { StyleSheet, Platform } from "react-native"
import { Colors, Metrics } from "../../../theme"

export const FormStyles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	logo: {
		marginRight: Metrics.spacing.component,
	},
	frame: {
		backgroundColor: Colors.background.underground,
	},
	frame_error: {
		borderWidth: 1,
		borderColor: Colors.error,
		borderStyle: "solid",
	},
	frame_yourself: {
		borderWidth: 1,
		borderColor: Colors.secondaries.teal,
	},

	dropdown: {
		marginLeft: Metrics.spacing.group,
	},
	cover: {
		width: Metrics.size.cover,
		height: Metrics.size.cover,
	},
	link: {
		marginRight: Metrics.spacing.link,
	},
	radio_font: {
		fontWeight: "bold",
	},
	textAreaContainer: {
		padding: 8,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: Colors.stroke,
		minHeight: 264,
		resize: "vertical",
		//To Do: Was not able to style the grabber of the text area:
		"&::-webkitResizer": {
			background: Colors.stroke,
			border: Colors.stroke,
			boxShadow: Colors.stroke,
			outline: Colors.stroke,
		},
		justifyContent: "flex-start",
	},
	messageAreaContainer: {
		minHeight: 72,
	},
	alignInvitation: {
		justifyContent: "flex-start",
	},
})

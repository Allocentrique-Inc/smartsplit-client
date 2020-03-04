import React from "react"
import { View, StyleSheet } from "react-native"
import MetricsStyles from "../styles/metrics"
import LayoutStyles from "../styles/layout"

function composeView(props, ...stylesheets) {
	const styles = stylesheets
	
	if(props.style) {
		if(typeof props.style === "object")
			styles.push(props.style)
		else
			styles.push(props.style)
	}
		
	return <View
		{...props}
		style={StyleSheet.compose(styles)}
	>{props.children}</View>
}
	

export function Group(props) {
	return composeView(props, MetricsStyles.components.component)
}

export function Section(props) {
	return composeView(props, MetricsStyles.components.group)
}

export function Column(props) {
	return composeView(props, LayoutStyles.column)
}

export function Row(props) {
	return composeView(props, LayoutStyles.row)
}

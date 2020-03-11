import React from "react"
import { View, StyleSheet } from "react-native"
import MetricsStyles from "./styles/metrics"
import LayoutStyles from "./styles/layout"

function composeView(props, ...stylesheets) {
	const { style, children, of, spacer, ...nextProps } = {
		spacer: Spacer,
		...props
	}
	
	const SpacerImpl = spacer
	let newChildren = children
	
	if(of) {
		newChildren = []
		
		React.Children.forEach(children, (child, index) => {
			newChildren.push(child)
			newChildren.push(<SpacerImpl key={"spacer-" + index} of={of} />)
		})
		
		newChildren.pop()
	}
	
	return <View
		{...nextProps}
		style={[...stylesheets, style]}
	>{newChildren}</View>
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

export function Spacer(props) {
	return <View style={MetricsStyles.spacing[props.of]} />
}

export function Flex(props) {
	return <View style={LayoutStyles.flex}>{props.children}</View>
}

export function Hairline(props) {
	const style = {}

	return <View style={LayoutStyles.hairline} />
}

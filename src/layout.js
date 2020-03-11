import React from "react"
import { View, StyleSheet } from "react-native"
import MetricsStyles from "./styles/metrics"
import LayoutStyles from "./styles/layout"
import LayerStyles from "./styles/layers"

function composeView(props, ...stylesheets) {
	const { style, children, of, spacer, layer, padding, ...nextProps } = {
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
		style={[
			...stylesheets,
			style,
			LayerStyles[layer || ""],
			MetricsStyles.padding[padding || ""],
		]}
	>{newChildren}</View>
}

export function Layer(props) {
	return composeView(props)
}

export function Group(props) {
	return composeView(props, MetricsStyles.components.group)
}

export function Section(props) {
	return composeView(props, MetricsStyles.components.section)
}

export function Column(props) {
	return composeView(props, LayoutStyles.column)
}

export function Row(props) {
	const { align, ...nextProps } = props
	return composeView(
		nextProps,
		LayoutStyles.row,
		LayoutStyles.align[align]
	)
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

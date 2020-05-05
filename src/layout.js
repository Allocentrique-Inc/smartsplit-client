import React from "react"
import { View, StyleSheet } from "react-native"
import MetricsStyles from "./styles/metrics"
import LayoutStyles from "./styles/layout"
import LayerStyles from "./styles/layers"

import { Text } from "./text"

function composeView(props, ...stylesheets) {
	const {
		style,
		flex,
		children,
		of,
		spacer,
		layer,
		padding,
		size,
		viewRef,
		...nextProps
	} = {
		spacer: Spacer,
		...props,
	}

	const SpacerImpl = spacer
	let newChildren = [children]

	if (of) {
		newChildren = []

		forEachChildren(children, (child) => {
			newChildren.push(child)
			newChildren.push(<SpacerImpl of={of} />)
		})

		newChildren.pop()
	}

	if (viewRef) nextProps.ref = viewRef

	return React.createElement(
		View,
		{
			...nextProps,
			style: [
				...stylesheets,
				style,
				LayerStyles[layer || ""],
				MetricsStyles.padding[padding || ""],
				typeof flex === "number" ? { flex } : null,
				MetricsStyles.sizes[size || ""],
			],
		},
		...newChildren
	)
}

export function forEachChildren(children, cb) {
	let index = 0

	function processChildren(children) {
		React.Children.forEach(children, (child) => {
			if (!child) return
			if (child.type === React.Fragment) processChildren(child.props.children)
			else cb(child, index++)
		})
	}

	processChildren(children)
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
	const { align, valign, wrap, ...nextProps } = props
	return composeView(
		nextProps,
		LayoutStyles.row,
		LayoutStyles.justify[align],
		LayoutStyles.align[valign],
		wrap ? LayoutStyles.wrap : null
	)
}

export function Spacer(props) {
	return <View style={MetricsStyles.spacing[props.of]} />
}

export function Flex(props) {
	return <View style={LayoutStyles.flex}>{props.children}</View>
}

export function Hairline(props) {
	return <View style={LayoutStyles.hairline} />
}

export function Divider(props) {
	const flexStyle = props.flex && { flex: 1 }

	return <View style={[LayoutStyles.divider, flexStyle, props.style]} />
}

export function TextDivider(props) {
	return (
		<Row of="component" style={{ alignSelf: "stretch", alignItems: "center" }}>
			<Divider flex />
			{props.children || <Text bold>{props.text}</Text>}
			<Divider flex />
		</Row>
	)
}

import React from "react"
import { View } from "react-native"
import MetricsStyles from "./styles/metrics"
import LayoutStyles from "./styles/layout"
import LayerStyles from "./styles/layers"
import { forEachChildren } from "./utils/react"
import { Text } from "./text"

function composeView(props, ...stylesheets) {
	const {
		style,
		flex,
		children,
		of,
		spacer,
		layer,
		margin,
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

			if (typeof child === "object" && child.type !== NoSpacer) {
				newChildren.push(<SpacerImpl of={of} />)
			}
		})

		if (
			newChildren.length &&
			newChildren[newChildren.length - 1].type === SpacerImpl
		) {
			newChildren.pop()
		}
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
				MetricsStyles.margin[margin || ""],
				MetricsStyles.padding[padding || ""],
				typeof flex === "number" ? { flex } : null,
				MetricsStyles.sizes[size || ""],
			],
		},
		...newChildren
	)
}

export { forEachChildren }

export function NoSpacer({ children }) {
	return children
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
	const { align, valign, ...nextProps } = props
	return composeView(
		nextProps,
		LayoutStyles.column,
		LayoutStyles.justify[valign],
		LayoutStyles.align[align]
	)
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

import React from "react"
import { StyleSheet, View } from "react-native"

import { Column, forEachChildren, Row } from "../layout"
import { Text } from "../text"
import { Colors } from "../theme"

export const TableStyle = StyleSheet.create({
	row: {
		borderTop: `1px solid ${Colors.stroke}`
	}
})

export function TableRow(props) {
	const {children} = props
	const proportions = props.proportions ? props.proportions : Array(children.length).fill(1)

	function getCellStyle(index) {
		return {
			flex: proportions[index] `${ 1/children.length * 100}%`
		}
	}

	let newChildren = [children]
	forEachChildren(children, (child, index) => {
		newChildren.push(<View style={getCellStyle(index)}>{child}</View>)
	})
	return (
		<Row>
			{newChildren}
		</Row>
	)
}
export function Table(props) {
	const {
		proportions,
		rowStyle,
		children,
		...nextProps
	} = props
	let newChildren = [children]
	forEachChildren(children, child => {
		newChildren.push(React.createElement(child, {proportions: proportions}))
	})
	return (
		<Column {...nextProps}>
			{newChildren}
		</Column>
	)
}

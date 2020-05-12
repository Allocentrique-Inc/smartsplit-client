import React from "react"
import { StyleSheet } from "react-native"

import { Column, Row } from "../layout"
import { Text } from "../text"
import { Colors } from "../theme"

export const TableStyle = StyleSheet.create({
	row: {
		borderTop: `1px solid ${Colors.stroke}`
	}
})
export function Table(props) {
	const {
		head,
		body,
		proportions,
		rowStyle,
		...nextProps
	} = props
	const flex = proportions ? proportions : Array(head.length).fill("auto")
	function renderRow(row, index = 0) {
		return <Row key={index} style={[TableStyle.row, rowStyle]}>
			{row.map((Item, index) =>
				typeof Item === "string" ?
					<Text key={index} style={{flex: flex[index]}}>{Item}</Text>
					:  <Item style={{flex: flex[index]}} />)}
		</Row>
	}

	return (
		<Column {...nextProps}>
			{head && renderRow(head)}
			{body &&
			body.map((row, index) => {
				renderRow(row, index)
			})}
		</Column>
	)
}

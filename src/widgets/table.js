import React from "react"
import { StyleSheet, View } from "react-native"
import { Column, forEachChildren, Row } from "../layout"
import { Colors, Metrics } from "../theme"

export const TableStyle = StyleSheet.create({
		row_regular: {
			boxShadow: `inset 0px 1px 0px ${Colors.stroke}`,
		},
		cell_regular: {
			padding: Metrics.spacing.small,
		},
		cell_head: {
			paddingTop: Metrics.spacing.small,
			paddingBottom: Metrics.spacing.small,
			paddingRight: Metrics.spacing.small,
			paddingLeft: 0
		},
	},
)

export function TableRow(props) {
	const { children, header } = props
	const proportions = props.proportions ? props.proportions : Array(children.length).fill(1)

	function getCellStyle(index) {
		return [
			header ? TableStyle.cell_head : TableStyle.cell_regular,
			{
				flexGrow: proportions[index],
				flexShrink: 1,
				flexBasis: 1 / children.length,
			},
		]
	}

	let newChildren = []
	forEachChildren(children, (child, index) => {
		newChildren.push(<View style={[TableStyle.cell_regular, getCellStyle(index)]
		}>{child}</View>)
	})
	return (
		<Row style={header ? null : TableStyle.row_regular}>
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
	let newChildren = []
	forEachChildren(children, child => {
		newChildren.push(React.cloneElement(child, { proportions: proportions }))
	})
	return (
		<Column {...nextProps}>
			{newChildren}
		</Column>
	)
}

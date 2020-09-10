import React, { useState } from "react"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Row, Column } from "../layout"
import { Metrics, Colors } from "../theme"
import TypographyStyles from "../styles/typography"
import { Text } from "../text"

export const TabStyles = StyleSheet.create({
	tab: {
		height: Metrics.size.large,
		alignItems: "center",
		flexDirection: "row",
		borderTopColor: "transparent",
		borderBottomColor: Colors.stroke,
		borderTopWidth: 1,
		borderBottomWidth: 1,
	},

	tab_active: {
		borderBottomColor: Colors.action,
		borderTopWidth: 2,
		borderBottomWidth: 2,
	},

	tab_text: {
		color: Colors.inactive,
	},

	tab_text_active: {
		color: Colors.primary,
	},

	spacer: {
		width: Metrics.spacing.group,
	},

	spacer_fill: {
		flex: 1,
	},
})

export function TabBar(props) {
	const { tab, style, barStyle, onTabChange, noBorder, children } = props

	let [currentTab, setCurrentTab] = useState(tab)

	let newChildren = []
	let defaultTab = null
	let activeTab = null

	if (tab) currentTab = tab

	React.Children.forEach(children, (child, index) => {
		child = [
			child,
			{
				active: false,
				onActivate: function () {
					setCurrentTab(child[0].key)
					if (onTabChange) onTabChange(child[0].key)
				},
				noBorder: noBorder,
			},
		]

		if (child[0].props.default) defaultTab = child

		if (child[0].key === currentTab) activeTab = child

		newChildren.push(child)
		newChildren.push([
			<View
				key={"spacer-" + index}
				style={[
					TabStyles.tab,
					TabStyles.spacer,
					noBorder && { borderBottomWidth: 0 },
				]}
			/>,
		])
	})

	newChildren.pop()

	if (!activeTab) activeTab = defaultTab

	if (activeTab) activeTab[1].active = true

	newChildren = newChildren.map((child) => {
		return child[1] ? React.cloneElement(...child) : child
	})

	return (
		<Column style={style}>
			<Row style={barStyle}>
				{newChildren}
				<View
					style={[
						TabStyles.tab,
						noBorder && { borderBottomWidth: 0 },
						TabStyles.spacer,
						TabStyles.spacer_fill,
					]}
				/>
			</Row>
			{activeTab && activeTab[0].props.children}
		</Column>
	)
}

export function Tab({ active, onActivate, title, noBorder }) {
	const tabStyles = [TabStyles.tab, noBorder && { borderBottomWidth: 0 }]
	const textStyles = [TypographyStyles.text.bold, TabStyles.tab_text]

	if (active) {
		tabStyles.push(TabStyles.tab_active)
		textStyles.push(TabStyles.tab_text_active)
	}

	return (
		<TouchableWithoutFeedback onPress={onActivate}>
			<View style={tabStyles} onClick={onActivate}>
				<Text style={textStyles}>{title}</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}

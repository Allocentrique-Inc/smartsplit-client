import React, { useState } from "react"
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native"
import { Row, Column } from "../layout"
import { Metrics, Colors } from "../theme"
import MetricsStyles from "../styles/metrics"
import TypographyStyles from "../styles/typography"

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
	let [currentTab, setCurrentTab] = useState(props.tab)
	
	let children = []
	let defaultTab = null
	let activeTab = null
	
	if(props.tab)
		currentTab = props.tab
	
	React.Children.forEach(props.children, (child, index) => {
		child = [child, {
			active: false,
			onActivate: function() {
				setCurrentTab(child[0].key)
				if(props.onTabChange)
					props.onTabChange(child[0].key)
			}
		}]
		
		if(child[0].props.default)
			defaultTab = child
		
		if(child[0].key === currentTab)
			activeTab = child
		
		children.push(child)
		children.push([<View
			key={"spacer-" + index}
			style={[TabStyles.tab, TabStyles.spacer]}
		/>])
	})
	
	children.pop()
	
	if(!activeTab)
		activeTab = defaultTab
	
	if(activeTab)
		activeTab[1].active = true
	
	children = children.map(child => {
		return child[1] ? React.cloneElement(...child) : child
	})
		
	return <Column>
		<Row>
			{children}
			<View style={[TabStyles.tab, TabStyles.spacer, TabStyles.spacer_fill]} />
		</Row>
		{activeTab && activeTab[0].props.children}
	</Column>
}

export function Tab(props) {
	const tabStyles = [TabStyles.tab]
	const textStyles = [TypographyStyles.text.bold, TabStyles.tab_text]
	
	if(props.active) {
		tabStyles.push(TabStyles.tab_active)
		textStyles.push(TabStyles.tab_text_active)
	}
	
	return <TouchableWithoutFeedback onPress={props.onActivate}>
		<View style={tabStyles} onClick={props.onActivate}>
			<Text style={textStyles}>{props.title}</Text>
		</View>
	</TouchableWithoutFeedback>
}

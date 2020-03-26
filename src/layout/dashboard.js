import React, { useState } from "react"
import {
	Platform,
	View,
	StyleSheet,
	TouchableWithoutFeedback
} from "react-native"
import { useRouteMatch, useHistory } from "react-router"
import { Row, Column } from "../layout"
import { Text }        from "../text"

import LayerStyles         from "../styles/layers"
import MetricsStyles       from "../styles/metrics"
import { Colors, Metrics } from "../theme"
import { CheckBox }        from "../forms"

import LogoSmartSplit from "../svg/logo-smartsplit"
import LinkIcon from "../svg/link"

export const DashboardStyles = StyleSheet.create({
	main: {
		flex: 1,
	},
	
	main_column: {
		flex: 1,
	},
	
	sidebar: {
		width: 288,
	},
	sidebar_menu: {
		paddingTop: 96,
	},
	menu_touchable: {
		alignSelf: "stretch",
		flexDirection: "row",
		borderWidth: 0,
		height: Metrics.size.large,
	},
	menu_item: {
		alignSelf: "stretch",
		height: Metrics.size.large,
		alignItems: "center",
	},
	logo: {
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: Metrics.spacing.group,
		height: Metrics.size.xlarge,
	},
	profileBar: {
		height: Metrics.size.xlarge,
	},
})


export function Sidebar(props) {
	return <Column style={[LayerStyles.underground_reversed, DashboardStyles.sidebar]}>
		<View style={[LayerStyles.underground_reversed2, DashboardStyles.logo]}>
			{<LogoSmartSplit />}
		</View>
		<Column style={DashboardStyles.sidebar_menu}>
			{props.children}
		</Column>
	</Column>
}

export function SidebarItem(props) {
	const Icon = props.icon || LinkIcon
	const active = useRouteMatch(props.to)
	const history = useHistory()
	
	function activate() {
		history.push(props.to)
	}

	return <TouchableWithoutFeedback
		style={DashboardStyles.menu_touchable}
		onPress={activate}
		accessibilityRole="button"
	>
		<Row style={DashboardStyles.menu_item}>
			<View style={MetricsStyles.components.component}>
				<Icon color={active ? Colors.action : Colors.inactive} />
			</View>
			<Text reversed bold={active}>{props.text}</Text>
		</Row>
	</TouchableWithoutFeedback>
}

export function ProfileBar(props) {
	return <Row style={[LayerStyles.underground, DashboardStyles.profileBar]}>
		{props.children}
	</Row>
}

export function Dashboard(props) {
	const [showSidebar, setSidebar] = useState(true)
	
	return <Row style={DashboardStyles.main}>
		{showSidebar && <Sidebar>
			{props.menuItems.map(item => 
				<SidebarItem {...item} key={item.to} />
			)}
		</Sidebar>}
		
		<Column style={DashboardStyles.main_column}>
			<ProfileBar>
				<CheckBox
					label="Menu"
					checked={showSidebar}
					onChange={setSidebar}
				/>
			</ProfileBar>
			{props.children}
		</Column>
	</Row>
}

export default Dashboard

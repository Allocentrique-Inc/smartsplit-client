import React from "react"
import {
	Platform,
	View,
	StyleSheet,
	TouchableNativeFeedback
} from "react-native"
import { useRouteMatch, useHistory } from "react-router"
import { Row, Column } from "../../views/layout"
import { Text }                from "../../views/text"

import LayerStyles          from "../../styles/layers"
import MetricsStyles        from "../../styles/metrics"
import { Colors, Metrics }  from "../../theme"

import LogoSmartSplit from "../../components/svg/logo-smartsplit"
import LinkIcon from "../../components/svg/link"

export const DashboardStyles = StyleSheet.create({
	main: {
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
		paddingLeft: Metrics.spacing.components.group,
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
	const MenuRow = Platform.OS === "web" ? Row : TouchableNativeFeedback
	const active = useRouteMatch(props.to)
	const history = useHistory()
	
	function activate() {
		history.push(props.to)
	}

	return <TouchableNativeFeedback
		style={DashboardStyles.menu_touchable}
		onPress={activate}
	>
		<Row
			style={DashboardStyles.menu_item}
			accessibilityRole="button"
			onClick={activate}
		>
			<View style={MetricsStyles.components.component}>
				<Icon color={active ? Colors.action : Colors.inactive} />
			</View>
			<Text inside reversed bold={active}>{props.text}</Text>
		</Row>
	</TouchableNativeFeedback>
}

export function ProfileBar(props) {
	return <Row style={[LayerStyles.underground, DashboardStyles.profileBar]}>
		{props.children}
	</Row>
}

export function Dashboard(props) {
	return <Row style={DashboardStyles.main}>
		<Sidebar>
			{props.menuItems.map(item => 
				<SidebarItem {...item} key={item.to} />
			)}
		</Sidebar>
		
		<Column style={DashboardStyles.main}>
			<ProfileBar>
				<Text>Profile bar</Text>
			</ProfileBar>
			{props.children}
		</Column>
	</Row>
}

export default Dashboard

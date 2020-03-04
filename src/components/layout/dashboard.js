import React from "react"
import { View, StyleSheet }    from "react-native"
import { useRouteMatch, useHistory } from "react-router"
import { Row, Column } from "../../views/layout"
import { Text }                from "../../views/text"

import LayerStyles          from "../../styles/layers"
import MetricsStyles        from "../../styles/metrics"
import { Colors, Metrics }  from "../../theme"

import LogoSmartSplit from "../../views/dashboard/logo-smartsplit"
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
	menu_item: {
		height: Metrics.size.large,
		alignItems: "center",
		cursor: "pointer",
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
			<LogoSmartSplit />
		</View>
		<Column style={DashboardStyles.sidebar_menu}>
			{props.children}
		</Column>
	</Column>
}

export function SidebarItem(props) {
	const { icon, text } = props
	const Icon = icon || LinkIcon
	const active = useRouteMatch(props.to)
	const history = useHistory()
	
	function activate() {
		history.push(props.to)
	}

	return <Row style={DashboardStyles.menu_item} onClick={activate}>
		<View style={MetricsStyles.components.component}>
			<Icon color={active ? Colors.action : Colors.inactive} />
		</View>
		<Text inside reversed bold={active}>{text}</Text>
	</Row>
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
				<SidebarItem {...item} />
			)}
		</Sidebar>
		
		<Column style={DashboardStyles.main}>
			<ProfileBar>
				<div> Profile bar </div>
			</ProfileBar>
			{props.children}
		</Column>
	</Row>
}

export default Dashboard

import React, { useState } from "react"
import {
	Platform,
	View,
	StyleSheet,
	TouchableWithoutFeedback,
} from "react-native"
import { useTranslation } from "react-i18next"
import { useRouteMatch, useHistory } from "react-router"
import { Row, Column, Flex, Spacer } from "../layout"
import { Text } from "../text"

import LayerStyles from "../styles/layers"
import MetricsStyles from "../styles/metrics"
import { Colors, Metrics } from "../theme"
import { CheckBox } from "../forms"
import Button from "../widgets/button"

import LogoSmartSplitMenu from "../svg/logo-smart-split-menu"
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
		borderWidth: 0, // au lieu de border
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
		alignItems: "center",
	},
})

export function Sidebar(props) {
	return (
		<Column style={[LayerStyles.underground_reversed, DashboardStyles.sidebar]}>
			<View style={[LayerStyles.underground_reversed2, DashboardStyles.logo]}>
				{<LogoSmartSplitMenu />}
			</View>
			<Column style={DashboardStyles.sidebar_menu}>{props.children}</Column>
		</Column>
	)
}

export function SidebarItem(props) {
	const [t] = useTranslation()
	const Icon = props.icon || LinkIcon
	const active = useRouteMatch(props.to)
	const history = useHistory()

	function activate() {
		history.push(props.to)
	}

	return (
		<TouchableWithoutFeedback
			style={DashboardStyles.menu_touchable}
			onPress={activate}
			accessibilityRole="button"
		>
			<Row style={DashboardStyles.menu_item}>
				<View style={MetricsStyles.components.component}>
					<Icon color={active ? Colors.action : Colors.inactive} />
				</View>
				<Text reversed bold={active}>
					{t(props.text)}
				</Text>
			</Row>
		</TouchableWithoutFeedback>
	)
}

export function ProfileBar(props) {
	return (
		<Row
			padding="component"
			style={[LayerStyles.underground, DashboardStyles.profileBar]}
		>
			{props.children}
		</Row>
	)
}

export function Dashboard(props) {
	const history = useHistory()
	const { i18n } = useTranslation()
	const [showSidebar, setSidebar] = useState(true)

	function logout() {
		history.push("/auth/logout")
	}

	return (
		<Column style={DashboardStyles.main}>
			<Row style={DashboardStyles.main}>
				{showSidebar && (
					<Sidebar>
						{props.menuItems.map((item) => (
							<SidebarItem {...item} key={item.to} />
						))}
					</Sidebar>
				)}

				<Column style={DashboardStyles.main_column}>
					<ProfileBar>
						<CheckBox
							label="Menu"
							checked={showSidebar}
							onChange={setSidebar}
						/>
						<Flex>{props.topBar}</Flex>
						<Button
							text="Français"
							primary={i18n.language === "fr"}
							disabled={i18n.language === "fr"}
							onClick={() => i18n.changeLanguage("fr")}
						/>
						<Button
							text="English"
							primary={i18n.language === "en"}
							disabled={i18n.language === "en"}
							onClick={() => i18n.changeLanguage("en")}
						/>
						<Spacer of="component" />
						<Button text="Déconnexion" onClick={logout} />
					</ProfileBar>
					{props.children}
				</Column>
			</Row>
		</Column>
	)
}

export default Dashboard

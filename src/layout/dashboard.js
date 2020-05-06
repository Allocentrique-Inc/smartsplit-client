import React, { useState } from "react"
import {
	Platform,
	View,
	StyleSheet,
	TouchableWithoutFeedback,
} from "react-native"
import { useTranslation } from "react-i18next"
import { useRouteMatch, useHistory } from "react-router"
import { Row, Column, Flex } from "../layout"
import { Text } from "../text"

import LayerStyles from "../styles/layers"
import MetricsStyles from "../styles/metrics"
import { Colors, Metrics } from "../theme"
import { CheckBox } from "../forms"

import LogoSmartSplitMenu from "../../assets/svg/logo-smart-split-menu"
import LinkIcon from "../../assets/svg/link"
import LogoArrowLeft from "../../assets/svg/arrow-left"
import LogoAddSquare from "../../assets/svg/add-square"

import UserAvatar from "../smartsplit/user/avatar"
import LogoNotification from "../../assets/svg/notifications"
import MusicNoteIcon from "../../assets/svg/music-note"
import UsersIcon from "../../assets/svg/users"

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

	menubar: {
		alignSelf: "stretch",
		justifyContent: "space-evenly",
		alignItems: "center",
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
		height: Metrics.size.large,
		...Platform.select({
			web: {
				boxShadow: "0px 10px 10px 10px #888888",
			},
		}),
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
	const [showSidebar, setSidebar] = useState(true)

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
						<LogoArrowLeft />
						<CheckBox
							label="Menu"
							checked={showSidebar}
							onChange={setSidebar}
						/>
						<Flex />
						<LogoAddSquare style={Metrics.size.small} />
					</ProfileBar>

					{props.children}
				</Column>
			</Row>

			<MenuBar />
		</Column>
	)
}

// Flex: toujours dans colonne (en vertical)

export function MenuBar(props) {
	return (
		<Row style={DashboardStyles.menubar}>
			<MenuBarItem
				to="/dashboard/my-works"
				icon={MusicNoteIcon}
				key="/dashboard/my-works"
			/>

			<MenuBarItem
				to="/dashboard/notifications"
				icon={LogoNotification}
				key="/dashboard/notifications"
			/>

			<MenuBarItem
				to="/dashboard/my-collaborators"
				icon={UsersIcon}
				key="/dashboard/my-collaborators"
			/>

			<MenuBarItem
				to="/dashboard/my-profile"
				icon={AvatarIcon}
				key="/dashboard/my-profile"
			/>
		</Row>
	)
}

export function MenuBarItem(props) {
	const Icon = props.icon
	const active = useRouteMatch(props.to)
	const history = useHistory()

	function activate() {
		history.push(props.to)
	}

	return (
		<TouchableWithoutFeedback onPress={activate} accessibilityRole="button">
			<View>
				<Icon color={active ? Colors.action : Colors.inactive} />
			</View>
		</TouchableWithoutFeedback>
	)
}

export function AvatarIcon(props) {
	return <UserAvatar initials="XX" size="small" />
}

export default Dashboard

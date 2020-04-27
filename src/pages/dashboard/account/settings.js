import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Platform, ScrollView, View } from "react-native"
import { Group, Hairline, Flex, Row, Column } from "../../../layout"
import { Heading, Paragraph, Text } from "../../../text"
import { Colors } from "../../../theme"
import { TextField, Dropdown, CheckBox } from "../../../forms"
import ChangePasswordModal from "../ChangePasswordContainer"
import DashboardNavbarWeb from "../../../layout/dashboard-navbar-web"
import DashboardNavbarNative from "../../../layout/dashboard-navbar-native"
import MyProfile from "./my-profile"
import AccountInfo from "./account-info"
import ProIdentity from "./my-identity"
import MyNotifications from "./my-notifications"
import SecurityPage from "./my-security"

const ProfileMenu = [
	{
		text: "profile:menu.profile",
		to: "/dashboard/my-profile",
	},
	{
		text: "profile:menu.account",
		to: "/dashboard/my-account",
	},
	{
		text: "profile:menu.identity",
		to: "/dashboard/my-identity",
	},
	{
		text: "profile:menu.notifications",
		to: "/dashboard/my-notifications",
	},
	{
		text: "profile:menu.security",
		to: "/dashboard/my-security",
	},
]

export default function SettingsPage() {
	const [t] = useTranslation()

	const [changePasswordModalOpened, setChangePasswordModalOpened] = useState(
		false
	)
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const [checkBox, setCheckBox] = useState(false)

	return (
		<>
			{Platform.OS === "web" && (
				<DashboardNavbarWeb header={t("dashboardHeader:web.settings")} />
			)}
			<ScrollView>
				<Group
					of={Platform.OS === "web" ? "group" : "component"}
					style={
						Platform.OS === "web" && { maxWidth: "944dp", alignSelf: "center" }
					}
				>
					<MyProfile />
					<AccountInfo />

					{Platform.OS === "web" && (
						<>
							<AccountInfo />

							<ProIdentity />

							<MyNotifications />

							<SecurityPage />
						</>
					)}
				</Group>
			</ScrollView>
		</>
	)
}

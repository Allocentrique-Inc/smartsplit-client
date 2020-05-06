import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, View, TouchableWithoutFeedback } from "react-native"
import { Platform } from "../../../platform"
import { Group, Hairline, Flex, Row, Column, Spacer } from "../../../layout"
import { Heading, Paragraph, Text } from "../../../text"
import { Colors } from "../../../theme"
import { TextField, Dropdown, CheckBox } from "../../../forms"
import { TabBar, Tab } from "../../../widgets/tabs"
import ChangePasswordModal from "../ChangePasswordContainer"
import DashboardNavbar from "../../../layout/dashboard-navbar"
import MyProfile from "../../auth/my-profile"
import MyAccount from "./my-account"
import MyIdentity from "./my-identity"
import MyNotifications from "./my-notifications"
import SecurityPage from "./my-security"

const ProfileMenu = [
	{
		text: "dashboardHeader:profile",
		to: "/dashboard/my-profile",
	},
	{
		text: "dashboardHeader:account",
		to: "/dashboard/my-account",
	},
	{
		text: "dashboardHeader:identity",
		to: "/dashboard/my-identity",
	},
	{
		text: "dashboardHeader:notifications",
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
			{Platform.web && <DashboardNavbar header={t("settings:settings")} />}
			<Platform
				web={Column}
				of="section"
				native={Column}
				of="group"
				style={
					Platform.web
						? { maxWidth: 624, alignSelf: "center" }
						: { maxWidth: 375, alignSelf: "center" }
				}
			>
				<ScrollView>
					<MyProfile />
					<Spacer of="section" />
					<Hairline />

					{Platform.web && (
						<>
							<MyAccount />
							<Spacer of="section" />
							<Hairline />

							<MyIdentity />
							<Spacer of="section" />
							<Hairline />

							<MyNotifications />
							<Spacer of="section" />
							<Hairline />

							<Hairline />
							<SecurityPage />
							<Spacer of="section" />
						</>
					)}
				</ScrollView>
			</Platform>
		</>
	)
}

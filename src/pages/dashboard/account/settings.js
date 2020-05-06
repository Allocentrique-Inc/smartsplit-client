import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, View, TouchableWithoutFeedback } from "react-native"
import { Platform } from "../../../platform"
import { Group } from "../../../layout"
import DashboardNavbarWeb from "../../../layout/dashboard-navbar-web"
import MyProfile from "./my-profile"

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

	return (
		<>
			{Platform.web && <DashboardNavbarWeb header={t("settings:settings")} />}

			<ScrollView>
				<Group
					style={
						Platform.OS === "web" && { maxWidth: 624, alignSelf: "center" }
					}
				>
					<MyProfile />
				</Group>
			</ScrollView>
		</>
	)
}

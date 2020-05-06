import React from "react"
import { Column, Divider, Hairline, Spacer } from "../../../layout"
import MyProfile from "./my-profile"
import MyNotifications from "./my-notifications"
import MyAccountPage from "./my-account"
import MyIdentity from "./my-identity"
import MySecurity from "./my-security"

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
	return (
		<Column of="section">
			<MyProfile/>
			<Hairline/>
			<MyIdentity/>
			<Hairline/>
			<MyNotifications/>
			<Hairline/>
			<MySecurity/>
		</Column>
	)
}

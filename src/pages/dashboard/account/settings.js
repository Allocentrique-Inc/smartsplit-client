import React from "react"
import { Column, Divider, Hairline, Spacer } from "../../../layout"
import MyProfile from "./my-profile"
import MyNotifications from "./my-notifications"
import MyAccountNative from "./my-account-native"
import MyIdentity from "./my-identity"
import MySecurity from "./my-security"
import MyAccount from "./my-account"

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
			<MyAccount/>
			<Hairline/>
			<MyIdentity/>
			<Hairline/>
			<MyNotifications/>
			<Hairline/>
			<MySecurity/>
		</Column>
	)
}

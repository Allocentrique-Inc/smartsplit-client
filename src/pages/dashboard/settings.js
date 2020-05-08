import React from "react"
import { Column, Hairline } from "../../layout"
import MyProfile from "../../smartsplit/forms/my-profile"
import MyNotifications from "../../smartsplit/forms/my-notifications"
import MyProIdentity from "../../smartsplit/forms/my-pro-identity"
import MySecurity from "../../smartsplit/forms/my-security"
import MyAccount from "../../smartsplit/forms/my-account"

const ProfileMenu = [
	{
		text: "dashboardHeader:profile",
		to: "/dashboard/my-profile",
	},
	{
		text: "dashboardHeader:settings",
		to: "/dashboard/my-settings",
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
			<MyProfile />
			<Hairline />
			<MyAccount />
			<Hairline />
			<MyProIdentity />
			<Hairline />
			<MyNotifications />
			<Hairline />
			<MySecurity />
		</Column>
	)
}

import React from "react"
import { useHistory } from "react-router"
import { Column, Hairline } from "../../layout"
import { Text } from "../../text"
import MyProfile from "../../smartsplit/forms/my-profile"
import MyNotifications from "../../smartsplit/forms/my-notifications"
import MyProIdentity from "../../smartsplit/forms/my-pro-identity"
import MySecurity from "../../smartsplit/forms/my-security"
import MyAccount from "../../smartsplit/forms/my-account"
import SubScreenLayout from "../../layout/subscreen"
import UserAvatar from "../../smartsplit/user/avatar"

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

export function SettingsPageFull() {}

export default function SettingsPage() {
	const history = useHistory()

	return (
		<SubScreenLayout
			title={
				<>
					<UserAvatar />
					<Text bold>Paramètres</Text>
				</>
			}
			onBack={() => history.goBack()}
		>
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
		</SubScreenLayout>
	)
}

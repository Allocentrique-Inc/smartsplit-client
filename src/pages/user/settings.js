import React from "react"
import { useHistory } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { Column, Hairline } from "../../layout"
import { Text } from "../../text"
import { Form, useForm } from "../../forms"
import MyProfile from "../../smartsplit/forms/my-profile"
import MyNotifications from "../../smartsplit/forms/my-notifications"
import MyProIdentity from "../../smartsplit/forms/my-pro-identity"
import MySecurity from "../../smartsplit/forms/my-security"
import MyAccount from "../../smartsplit/forms/my-account"
import SubScreenLayout from "../../layout/subscreen"
import UserAvatar from "../../smartsplit/user/avatar"
import Button from "../../widgets/button"

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

const settingsDefaultValues = {
	firstName: "John",
	lastName: "Doe",
	artistName: "Example",
	locale: "fr",
	mobilePhone: "",
	birthdate: "1969-01-01",
	isni: "",
	uri: "https://github.com/iptoki",
}

export function SettingsForm({ children }) {
	const history = useHistory()
	const user = useSelector((s) => s.auth.data.user)
	const dispatch = useDispatch()
	console.log(user)

	function handleSubmit(values) {
		console.log("Save form", values)
		dispatch({
			type: "LOGIN_UPDATE_USER",
			payload: { ...user, ...values },
		})
		history.push("/dashboard/")
	}

	return (
		<Form
			values={{ ...settingsDefaultValues, ...user }}
			onSubmit={handleSubmit}
		>
			{children}
		</Form>
	)
}

export default function SettingsPage() {
	return (
		<SettingsForm>
			<SettingsPageFull />
			{/* Switch entre web/mobile ici, utiliser un <Router> */}
		</SettingsForm>
	)
}

export function SettingsPageFull() {
	const history = useHistory()
	const form = useForm()

	return (
		<SubScreenLayout
			title={
				<>
					<UserAvatar size="medium" />
					<Text bold>Paramètres</Text>
				</>
			}
			onBack={() => history.goBack()}
			actions={
				<Button tertiary text="Sauvegarder" onClick={() => form.submit()} />
			}
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

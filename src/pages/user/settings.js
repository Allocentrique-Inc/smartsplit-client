import React from "react"
import { useHistory } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import objdiff from "object-diff"
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
import { useSessionUser } from "../../../redux/Users/hooks"

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
	birthdate: "1969-01-01",
	isni: "",
	uri: "https://github.com/iptoki",
	avatarUrl: null,
}

export function SettingsForm({ children }) {
	const history = useHistory()
	const user = useSessionUser()

	const phone = user.data && user.data.mobilePhone
	const formValues = {
		...settingsDefaultValues,
		...user.data,
		phoneNumber: phone ? phone.number : "",
	}

	async function handleSubmit(values) {
		const diff = objdiff(formValues, values)

		if (Object.keys(diff).length > 0) {
			await user.update(diff)
		}

		history.push("/dashboard/")
	}

	return (
		<Form key={user.data} values={formValues} onSubmit={handleSubmit}>
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
	const user = useSessionUser()

	return (
		<SubScreenLayout
			title={
				<>
					<UserAvatar size="medium" />
					<Text bold>Paramètres</Text>
					{user.state !== "ready" && <Text>(chargement en cours...)</Text>}
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

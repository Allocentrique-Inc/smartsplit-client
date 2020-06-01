import React from "react"
import { useHistory } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
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
import MultisectionLayout from "../../layout/multi-section"
import UserAvatar from "../../smartsplit/user/avatar"
import Button from "../../widgets/button"
import AccessControl from "../../widgets/AccessControl"
import { useAuthUser } from "../../../redux/auth/hooks"

const settingsDefaultValues = {
	firstName: "",
	lastName: "",
	artistName: "",
	locale: "fr",
	birthdate: "1969-01-01",
	isni: "",
	uri: "https://github.com/iptoki",
	avatarUrl: null,
}

export function SettingsForm({ children }) {
	const history = useHistory()
	const user = useAuthUser()

	const formValues = {
		...settingsDefaultValues,
		...user.data,
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
		<AccessControl redirectToLogin>
			<SettingsForm>
				<SettingsPageFull />
				{/* Switch entre web/mobile ici, utiliser un <Router> */}
			</SettingsForm>
		</AccessControl>
	)
}

export function SettingsPageFull() {
	const { t } = useTranslation()
	const history = useHistory()
	const form = useForm()
	const user = useAuthUser()

	return (
		<SubScreenLayout
			title={
				<>
					<UserAvatar user={user.data} size="medium" />
					<Text bold>Paramètres</Text>
					{user.state !== "ready" && <Text>(chargement en cours...)</Text>}
				</>
			}
			onBack={() => history.goBack()}
			actions={
				<Button tertiary text="Sauvegarder" onClick={() => form.submit()} />
			}
		>
			<MultisectionLayout>
				<MyProfile url="/user/settings/profile" title={t("settings:profile")} />
				<MyAccount
					url="/user/settings/account"
					title={t("settings:settings")}
				/>
				<MyProIdentity
					url="/user/settings/professional-identity"
					title={t("settings:identity")}
				/>
				<MyNotifications
					url="/user/settings/notifications"
					title={t("settings:notifications")}
				/>
				<MySecurity
					url="/user/settings/security"
					title={t("settings:security")}
				/>
			</MultisectionLayout>
		</SubScreenLayout>
	)
}

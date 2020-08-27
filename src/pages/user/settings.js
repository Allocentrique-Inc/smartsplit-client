import React, { useEffect } from "react"
import { TouchableWithoutFeedback } from "react-native"
import { Route, Redirect, Switch, useHistory } from "react-router"
//import { useStorePath } from "../../appstate/react"
import { useStores, useStorePath } from "../../mobX"
import { useTranslation } from "react-i18next"
import objdiff from "object-diff"
import { Column, Row, Hairline } from "../../layout"
import { Heading, Text } from "../../text"
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
import { Platform } from "../../platform"
import { MobileMenu } from "../dashboard"
import { TabBar, Tab } from "../../widgets/tabs"
import { Metrics } from "../../theme"

import UsersIcon from "../../svg/user"
import UserCardIcon from "../../svg/user-card"
import SettingsIcon from "../../svg/settings"
import LogoutIcon from "../../svg/logout"
import { observer } from "mobx-react"

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

export const SettingsForm = observer(function ({ redirectOnSave, children }) {
	const history = useHistory()
	const { auth } = useStores()
	const user = useStorePath("auth", "user")

	useEffect(() => {
		if (!auth.isLoading && user.state === "undefined") {
			user.read()
		}
	}, [user])

	const formValues = {
		...settingsDefaultValues,
		...user.data,
	}

	async function handleSubmit(values) {
		const diff = objdiff(formValues, values)

		if (Object.keys(diff).length > 0) {
			await user.update(diff)
		}

		history.push(redirectOnSave || "/dashboard/")
	}

	return (
		<Form values={formValues} onSubmit={handleSubmit}>
			{children}
		</Form>
	)
})

export function SettingsPage() {
	return (
		<SettingsForm>
			<SettingsPageFull />
			{/* Switch entre web/mobile ici, utiliser un <Router> */}
		</SettingsForm>
	)
}

export function SettingsPageFull() {
	const { t } = useTranslation()
	const history = useHistory()
	const form = useForm()

	return (
		<SubScreenLayout
			title={<SettingsPageTitle />}
			onBack={() => history.goBack()}
			actions={
				<Button
					tertiary
					text={t("general:buttons.save")}
					onClick={() => form.submit()}
				/>
			}
		>
			<Route path="/user/settings/" exact>
				<Redirect to="/user/settings/profile" />
			</Route>

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

export const SettingsPageTitle = observer(function () {
	const user = useStorePath("auth", "user")

	return (
		<Row of="component" valign="center">
			<UserAvatar user={user.data} size="medium" />
			<Text bold>Paramètres</Text>
			{user.state !== "ready" && <Text>(chargement en cours...)</Text>}
		</Row>
	)
})

export const SettingsMenu = observer(function () {
	const { t } = useTranslation()
	const user = useStorePath("auth", "user")

	return (
		<Column>
			<Row of="component" padding="component" valign="center">
				<UserAvatar user={user.data} initials="XX" size="medium" />
				<Column>
					{user.data.artistName && (
						<Heading level={1}>{user.data.artistName}</Heading>
					)}
					{(user.data.firstName || user.data.lastName) && (
						<Text>
							{user.data.firstName} {user.data.lastName}
						</Text>
					)}
				</Column>
			</Row>
			<Hairline />
			<Column of="group" padding="group">
				<SettingsMenuItem
					to="/user/settings/profile"
					icon={<UsersIcon />}
					text={t("menu:profile")}
				/>

				<SettingsMenuItem
					to="/user/settings/account"
					icon={<UserCardIcon />}
					text={t("menu:account")}
				/>

				<SettingsMenuItem
					to="/user/settings/notifications"
					icon={<SettingsIcon />}
					text={t("settings:preferences")}
				/>

				<SettingsMenuItem
					to="/auth/logout"
					icon={<LogoutIcon />}
					text={t("menu:logout")}
				/>

				<SettingsMenuItem
					to="/test/"
					icon={<SettingsIcon />}
					text={t("menu:tests")}
				/>
			</Column>
		</Column>
	)
})

export function SettingsMenuItem({ to, icon, text }) {
	const history = useHistory()

	function activate() {
		history.push(to)
	}

	return (
		<TouchableWithoutFeedback onPress={activate} accessibilityRole="button">
			<Row of="component">
				{icon}
				<Text>{text}</Text>
			</Row>
		</TouchableWithoutFeedback>
	)
}

export function MobileRoute({ path, title, children }) {
	const { t } = useTranslation()
	const history = useHistory()
	const form = useForm()

	return (
		<Route path={path}>
			<SubScreenLayout
				title={<Text bold>{title}</Text>}
				onBack={() => history.push("/user/settings")}
				actions={
					<Button
						tertiary
						text={t("general:buttons.save")}
						onClick={() => form.submit()}
					/>
				}
			>
				{children}
			</SubScreenLayout>
		</Route>
	)
}

export function MobileAccount({ tab }) {
	const { t } = useTranslation()
	return (
		<TabBar
			style={{
				paddingLeft: Metrics.spacing.component,
				paddingRight: Metrics.spacing.component,
			}}
			barStyle={{ marginBottom: Metrics.spacing.group }}
		>
			<Tab
				key="account"
				title={t("settings:accountInfo")}
				default={tab === "account"}
			>
				<MyAccount />
				<MySecurity />
			</Tab>
			<Tab
				key="identity"
				title={t("settings:identity")}
				default={tab === "identity"}
			>
				<MyProIdentity />
			</Tab>
		</TabBar>
	)
}

export default observer(function SettingsRouter() {
	const { t } = useTranslation()
	const { auth } = useStores()
	if (auth.isLoggedIn === false) {
		const history = useHistory()
		history.push("/auth/login")
		return null
	}

	return Platform.web ? (
		<SettingsPage />
	) : (
		<MobileMenu>
			<SettingsForm redirectOnSave="/user/settings/">
				<Switch>
					<Route path="/user/settings/" exact>
						<SettingsMenu />
					</Route>

					<MobileRoute path="/user/settings/profile" title={t("menu:profile")}>
						<Hairline />
						<Column padding="group">
							<MyProfile />
						</Column>
					</MobileRoute>

					<MobileRoute path="/user/settings/account" title={t("menu:account")}>
						<MobileAccount tab="account" />
					</MobileRoute>

					<MobileRoute
						path="/user/settings/professional-identity"
						title={t("menu:account")}
					>
						<MobileAccount tab="identity" />
					</MobileRoute>

					<MobileRoute
						path="/user/settings/notifications"
						title={t("settings:preferences")}
					>
						<Hairline />
						<Column padding="group">
							<MyNotifications />
						</Column>
					</MobileRoute>

					<MobileRoute path="/user/settings/security" title={t("menu:account")}>
						<MobileAccount tab="account" />
					</MobileRoute>
				</Switch>
			</SettingsForm>
		</MobileMenu>
	)
})

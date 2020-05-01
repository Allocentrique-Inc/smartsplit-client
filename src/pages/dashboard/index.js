import React from "react"
import { Switch, Route, Redirect } from "react-router"
import DashboardLayout from "../../layouts/dashboard.layout"
import Scrollable from "../../components/scrollable"

import MusicNoteIcon from "../../svg/music-note"
import UserCardIcon from "../../svg/user-card"
import UsersIcon from "../../svg/users"

import MyWorksPage from "./my-works"
import SettingsPage from "../web/settings"
import MyCollaboratorsPage from "./my-collaborators"
import MyAccountPage from "./account/my-account"
import ChangePasswordPage from "./change-password"
import NewEmailModal from "./new-email"
import FormsTest from "../test/forms"
import TestRedux from "../test/TestRedux"

const MENU = [
	{
		text: "menu:works",
		to: "/dashboard/my-works",
		icon: MusicNoteIcon,
	},
	{
		text: "menu:profile",
		to: "/dashboard/account/settings",
		icon: UserCardIcon,
	},
	{
		text: "menu:account",
		to: "/dashboard/my-account",
	},
	{
		text: "menu:collaborators",
		to: "/dashboard/my-collaborators",
		icon: UsersIcon,
	},
	{
		text: "menu:testsForms",
		to: "/dashboard/test/forms",
	},
	{
		text: "menu:testsFormsPage",
		to: "/test/forms",
	},
	{
		text: "menu:reduxTests",
		to: "/test/reduxTest",
	},
]

export default function DashboardPage(props) {
	return (
		<DashboardLayout menuItems={MENU}>
			<Scrollable>
				<DashboardRoutes />
			</Scrollable>
		</DashboardLayout>
	)
}

export function DashboardRoutes(props) {
	return (
		<Switch>
			<Route path="/dashboard/" exact>
				<Redirect to="/dashboard/my-works" />
			</Route>

			<Route path="/dashboard/my-works" exact>
				<MyWorksPage />
			</Route>

			<Route path="/dashboard/account/settings" exact>
				<SettingsPage />
			</Route>

			<Route path="/dashboard/my-account" exact>
				<MyAccountPage />
			</Route>

			<Route path="/dashboard/my-collaborators" exact>
				<MyCollaboratorsPage />
			</Route>

			<Route path="/dashboard/change-password" exact>
				<ChangePasswordPage />
			</Route>

			<Route path="/dashboard/new-email" exact>
				<NewEmailModal />
			</Route>

			<Route path="/dashboard/test/forms" exact>
				<FormsTest />
			</Route>
		</Switch>
	)
}

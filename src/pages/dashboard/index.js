import React from "react"
import { Switch, Route, Redirect } from "react-router"
import DashboardLayout from "../../layout/dashboard"
import Scrollable from "../../widgets/scrollable"

import MusicNoteIcon from "../../svg/music-note"
import UserCardIcon from "../../svg/user-card"
import UsersIcon from "../../svg/users"

import MyWorksPage from "./my-works"
import MyProfilePage from "./my-profile"
import MyCollaboratorsPage from "./my-collaborators"
import MyAccountPage from "./my-account"
import ChangePasswordPage from "./change-password"
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
		to: "/dashboard/my-profile",
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
	const [t, i18n] = useTranslation()
	return (
		<Switch>
			<Route path="/dashboard/" exact>
				<Redirect to="/dashboard/my-works" />
			</Route>

			<Route path="/dashboard/my-works" exact>
				<MyWorksPage />
			</Route>

			<Route path="/dashboard/my-profile" exact>
				<MyProfilePage />
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

			<Route path="/dashboard/test/forms" exact>
				<FormsTest />
			</Route>
		</Switch>
	)
}

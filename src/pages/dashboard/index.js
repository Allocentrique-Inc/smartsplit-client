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
		text: "Mes pièces musicales",
		to: "/dashboard/my-works",
		icon: MusicNoteIcon,
	},
	{
		text: "Mon profil",
		to: "/dashboard/my-profile",
		icon: UserCardIcon,
	},
	{
		text: "Mon compte",
		to: "/dashboard/my-account",
	},
	{
		text: "Mes collaborateurs",
		to: "/dashboard/my-collaborators",
		icon: UsersIcon,
	},
	{
		text: "Tests Formulaires",
		to: "/dashboard/test/forms",
	},
	{
		text: "Formulaires pleine page",
		to: "/test/forms",
	},
	{
		text: "Redux test",
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

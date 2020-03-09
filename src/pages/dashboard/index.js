import React from "react"
import { Switch, Route, Redirect } from "react-router"
import { ScrollView } from "react-native"
import DashboardLayout from "../../layout/dashboard"

import MusicNoteIcon from "../../svg/music-note"
import UserCardIcon  from "../../svg/user-card"
import UsersIcon     from "../../svg/users"

import MyWorksPage         from "./my-works"
import MyProfilePage       from "./my-profile"
import MyCollaboratorsPage from "./my-collaborators"
import FormsTest           from "../test/forms"

const MENU = [
	{
		text: "Mes pièces musicales",
		to: "/dashboard/my-works",
		icon: MusicNoteIcon
	},
	{
		text: "Mon profil",
		to: "/dashboard/my-profile",
		icon: UserCardIcon
	},
	{
		text: "Mes collaborateurs",
		to: "/dashboard/my-collaborators",
		icon: UsersIcon
	},
	{
		text: "Tests Formulaires",
		to: "/dashboard/test/forms"
	},
	{
		text: "Formulaires pleine page",
		to: "/test/forms"
	}
]

export default function DashboardPage(props) {
	return <DashboardLayout menuItems={MENU}>
		<ScrollView>
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
				
				<Route path="/dashboard/my-collaborators" exact>
					<MyCollaboratorsPage />
				</Route>

				<Route path="/dashboard/test/forms" exact>
					<FormsTest />
				</Route>
			</Switch>
		</ScrollView>
	</DashboardLayout>
}

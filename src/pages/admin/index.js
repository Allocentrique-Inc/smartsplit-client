import React from "react"
import { Switch, Route, Redirect, useHistory } from "react-router"
import DashboardLayout from "../../layout/dashboard"
import Tool from "../../svg/tool"
import Money from "../../svg/money"
import ListManagement from "./list-management"
import Scrollable from "../../widgets/scrollable"
import SubScreenLayout from "../../layout/subscreen"
import { ListDetail } from "./list-detail"

const MENU = [
	{
		text: "adminMenu:listManagement",
		to: "/admin/list-management",
		icon: Tool,
	},
	{
		text: "adminMenu:businessSettings",
		to: "/admin/business-settings",
		icon: Tool,
	},
	{
		text: "adminMenu:adminManagement",
		to: "/admin/admin-management",
		icon: Tool,
	},
	{
		text: "adminMenu:myIncomes",
		to: "/admin/incomes",
		icon: Money,
	},
]

export default function Routes() {
	const history = useHistory()
	return (
		<Switch>
			<Route path="/admin" exact>
				<Redirect to="/admin/list-management" />
			</Route>
			<Route path="/admin/list-management" exact>
				<DashboardLayout menuItems={MENU}>
					<ListManagement/>
				</DashboardLayout>
			</Route>
			<Route path="/admin/list-detail/:id" exact>
				<SubScreenLayout onBack={() => history.push("/admin/list-management")}>
					<ListDetail/>
				</SubScreenLayout>
			</Route>
			<Route path="/admin/business-settings" exact />
			<Route path="/admin/admin-management" exact />
			<Route path="/admin/incomes" exact />
		</Switch>
	)
}

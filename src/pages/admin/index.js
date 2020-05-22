import React from "react"
import { Switch, Route, Redirect } from "react-router"
import DashboardLayout from "../../layout/dashboard"
import Tool from "../../svg/tool"
import Money from "../../svg/money"

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

export default function AdminPage() {
	return (
		<DashboardLayout menuItems={MENU}>
			<AdminRoutes />
		</DashboardLayout>
	)
}

function AdminRoutes() {
	return (
		<Switch>
			<Route path="/admin" exact>
				<Redirect to="/admin/list-management" />
			</Route>
			<Route path="/admin/list-management" exact />
			<Route path="/admin/business-settings" exact />
			<Route path="/admin/admin-management" exact />
			<Route path="/admin/incomes" exact />
		</Switch>
	)
}

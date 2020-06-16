import React from "react"
import { Switch, Route, Redirect, useHistory } from "react-router"
import DashboardLayout from "../../layouts/dashboard"
import Tool from "../../svg/tool"
import Money from "../../svg/money"
import ListManagement from "./list-management"
import ListPage from "./list-page"

const MENU = [
	{
		text: "admin:menu.listManagement",
		to: "/admin/list-management",
		icon: Tool,
	},
	{
		text: "admin:menu.businessSettings",
		to: "/admin/business-settings",
		icon: Tool,
	},
	{
		text: "admin:menu.adminManagement",
		to: "/admin/admin-management",
		icon: Tool,
	},
	{
		text: "admin:menu.myIncomes",
		to: "/admin/incomes",
		icon: Money,
	},
	{
		text: "Dashboard",
		to: "/dashboard",
		icon: Tool,
	},
]

export default function Routes() {
	return (
		<Switch>
			<Route path="/admin" exact>
				<Redirect to="/admin/list-management" />
			</Route>
			<Route path="/admin/list-management" exact>
				<DashboardLayout menuItems={MENU}>
					<ListManagement />
				</DashboardLayout>
			</Route>
			<Route path="/admin/list-management/:id" exact>
				{(props) => (
					<DashboardLayout menuItems={MENU}>
						<ListPage {...props} />
					</DashboardLayout>
				)}
			</Route>
			<Route path="/admin/business-settings" exact>
				<DashboardLayout menuItems={MENU} />
			</Route>
			<Route path="/admin/admin-management" exact>
				<DashboardLayout menuItems={MENU} />
			</Route>
			<Route path="/admin/incomes" exact>
				<DashboardLayout menuItems={MENU} />
			</Route>
		</Switch>
	)
}

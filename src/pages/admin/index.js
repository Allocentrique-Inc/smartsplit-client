import React from "react"
import { Switch, Route, Redirect, useHistory } from "react-router"
import DashboardLayout from "../../layout/dashboard"
import Tool from "../../svg/tool"
import Money from "../../svg/money"
import ListManagement from "./list-management"
import SubScreenLayout from "../../layout/subscreen"
import ListPage  from "./list-page"
import { resetEntityList } from "../../../redux/entities/actions"
import { useDispatch } from "react-redux"

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
	const dispatch = useDispatch()

	function handleBack() {
		dispatch(resetEntityList())
		history.push("/admin/list-management")
	}

	return (
		<Switch>
			<Route path="/admin" exact>
				<Redirect to="/admin/list-management"/>
			</Route>
			<Route path="/admin/list-management" exact>
				<DashboardLayout menuItems={MENU}>
					<ListManagement/>
				</DashboardLayout>
			</Route>
			<Route path="/admin/lists/:id"
			       component={(props) => <SubScreenLayout onBack={handleBack}>
				       <ListPage {...props}/></SubScreenLayout>} exact>

			</Route>
			<Route path="/admin/business-settings" exact>
				<DashboardLayout menuItems={MENU}/>
			</Route>
			<Route path="/admin/admin-management" exact>
				<DashboardLayout menuItems={MENU}/>
			</Route>
			<Route path="/admin/incomes" exact>
				<DashboardLayout menuItems={MENU}/>
			</Route>
		</Switch>
	)
}

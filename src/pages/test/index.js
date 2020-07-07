import React from "react"

import { Switch, Route, Redirect } from "react-router"
import DashboardLayout from "../../layout/dashboard"
import Scrollable from "../../widgets/scrollable"

import FormsTest from "./forms"
import StoreTestPage from "./store"
import LilaTest from "./lila"

export default function TestDashboard() {
	return (
		<DashboardLayout
			menuItems={[
				{ text: "menu:dashboard", to: "/dashboard" },
				{
					text: "menu:testsForms",
					to: "/test/forms",
				},
				{ text: "Lila", to: "/test/lila" },
				{ text: "Widgets", to: "/test/widgets" },
				{ text: "State Store", to: "/test/store" },
				{
					text: "Admin",
					to: "/admin",
				},
			]}
		>
			<Scrollable>
				<TestRoutes />
			</Scrollable>
		</DashboardLayout>
	)
}

export function TestRoutes() {
	return (
		<Switch>
			<Route path="/test/forms" exact>
				<FormsTest />
			</Route>

			<Route path="/test/lila" exact>
				<LilaTest />
			</Route>

			<Route path="/test/store" exact>
				<StoreTestPage />
			</Route>
		</Switch>
	)
}

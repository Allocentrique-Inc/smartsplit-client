import React from "react"

import { Switch, Route, Redirect } from "react-router"
import DashboardLayout from "../../layout/dashboard"
import Scrollable from "../../widgets/scrollable"

import FormsTest from "./forms"
import WidgetTests from "./widgets"
import StoreTestPage from "./store"
import ModalTests from "./modals"
import MobxTests from "./mobx"
export default function TestDashboard() {
	return (
		<DashboardLayout
			menuItems={[
				{ text: "menu:dashboard", to: "/dashboard" },
				{ text: "State Store", to: "/test/store" },
				{ text: "MobX Test", to: "/test/mobx" },
				{
					text: "menu:testsForms",
					to: "/test/forms",
				},
				{ text: "Modals", to: "/test/modals" },
				{ text: "Widgets", to: "/test/widgets" },
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
			<Route path="/test/" exact>
				<StoreTestPage />
			</Route>

			<Route path="/test/store" exact>
				<StoreTestPage />
			</Route>

			<Route path="/test/forms" exact>
				<FormsTest />
			</Route>

			<Route path="/test/modals" exact>
				<ModalTests />
			</Route>

			<Route path="/test/widgets" exact>
				<WidgetTests />
			</Route>

			<Route path="/test/mobx" exact>
				<MobxTests />
			</Route>
		</Switch>
	)
}

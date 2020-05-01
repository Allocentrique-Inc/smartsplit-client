import React from "react"
import { Redirect } from "react-router"
import SettingsPage from "../pages/web/settings"
import Route from "./route"
export default function WebRoutes() {
	return (
		<><Route path="/" exact>
			<Redirect to="/dashboard/settings" />
		</Route>,
			<Route path="/dashboard/settings" exact component={SettingsPage}/></>
	)
}

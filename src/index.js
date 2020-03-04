import React from "react"
import { ScrollView } from "react-native"
import { Route, Redirect, Switch } from "react-router"

import DashboardPage from "./pages/dashboard"
import FormsTest from "./pages/test/forms"

export default function Main(props) {
	return <Switch>
		<Route path="/" exact>
			<Redirect to="/dashboard/" />
		</Route>

		<Route path="/dashboard/">
			<DashboardPage />
		</Route>

		<Route path="/test/forms" exact>
			<ScrollView>
				<FormsTest />
			</ScrollView>
		</Route>
	</Switch>
}

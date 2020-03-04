import React from "react"
import { Platform, ScrollView } from "react-native"
import { Route, Redirect, Switch } from "react-router"
import { MemoryRouter } from "react-router"
import { BrowserRouter } from "react-router-dom"

import DashboardPage from "./src/pages/dashboard"
import FormsTest from "./src/pages/test/forms"

const RouterImpl = Platform.select({
	android: MemoryRouter,
	ios: MemoryRouter,
	web: BrowserRouter
})

export default function App(props) {
	return <RouterImpl>
		<Switch>
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
	</RouterImpl>
}

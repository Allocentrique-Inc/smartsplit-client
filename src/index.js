import React from "react"
import ReactDOM from "react-dom"
import { ScrollView } from "react-native"
import { Route, Redirect, Switch } from "react-router"
import { BrowserRouter } from "react-router-dom"

import DashboardPage from "./pages/dashboard"
import FormsTest from "./pages/test/forms"

const App = <BrowserRouter>
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
</BrowserRouter>

ReactDOM.render(App, document.getElementById('root'))

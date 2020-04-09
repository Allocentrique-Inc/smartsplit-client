import React from "react"
import { Route, Redirect, Switch } from "react-router"

import { Overlay as GlobalOverlay } from "./portals"
import { Overlay as ScrollOverlay, Scrollable } from "./widgets/scrollable"

import Register      from "./pages/auth/register"
import Login         from "./pages/auth/LoginContainer"
import Logout        from "./pages/auth/Logout"
import Welcome       from "./pages/auth/welcome"
import DashboardPage from "./pages/dashboard"
import FormsTest     from "./pages/test/forms"

import TestRedux	 from "./pages/test/TestReduxContainer"

export default function Main(props) {
	return <ScrollOverlay.ProviderContainer>
		<GlobalOverlay.ProviderContainer>
			<MainRouter {...props} />
		</GlobalOverlay.ProviderContainer>
	</ScrollOverlay.ProviderContainer>
}

export function MainRouter(props) {
	return <Switch>
		<Route path="/" exact>
			<Redirect to="/dashboard/" />
		</Route>
		
		<Route path="/auth/welcome" exact>
			<Welcome />
		</Route>
		
		<Route path="/auth/register" exact>
			<Register />
		</Route>

		<Route path="/auth/login" exact>
			<Login />
		</Route>

		<Route path="/auth/logout" exact>
			<Logout />
		</Route>

		<Route path="/dashboard/">
			<DashboardPage />
		</Route>

		<Route path="/test/forms" exact>
			<Scrollable>
				<FormsTest />
			</Scrollable>
		</Route>

		<Route path="/test/reduxTest" exact>
			<Scrollable>
				<TestRedux />
			</Scrollable>
		</Route>
	</Switch>
}

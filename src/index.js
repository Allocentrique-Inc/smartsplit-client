import React from "react"
import { Route, Redirect, Switch } from "react-router"

import { Overlay as GlobalOverlay } from "./portals"
import { Overlay as ScrollOverlay, Scrollable } from "./widgets/scrollable"

import AuthPages from "./pages/auth"
import DashboardPage from "./pages/dashboard"
import FormsTest from "./pages/test/forms"
import CopyrightShare from "./pages/document/copyright"
import UserActivateAccount from "./pages/user/activate"
import ChangePasswordModal from "./pages/dashboard/change-password"

import TestRedux from "./pages/test/TestReduxContainer"

export default function Main(props) {
	return (
		<ScrollOverlay.ProviderContainer>
			<GlobalOverlay.ProviderContainer>
				<MainRouter {...props} />
			</GlobalOverlay.ProviderContainer>
		</ScrollOverlay.ProviderContainer>
	)
}

export function MainRouter(props) {
	return (
		<Switch>
			<Route path="/" exact>
				<Redirect to="/dashboard/" />
			</Route>

			<Route path="/auth/">
				<AuthPages />
			</Route>

			<Route
				path="/user/activate/:token"
				exact
				component={UserActivateAccount}
			/>

			<Route path="/user/change-password/:token" exact component={AuthPages} />

			<Route path="/document/copyright" exact>
				<CopyrightShare />
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
	)
}

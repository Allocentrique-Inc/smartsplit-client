import React from "react"
import { Redirect, Route, Switch } from "react-router"
import SettingsPage from "../pages/web/settings"
import AuthPages from "../pages/auth"
import UserActivateAccount from "../pages/user/activate"
import AccessControl from "../components/AccessControl"
import { Scrollable } from "../components/scrollable"
import FormsTest from "../pages/test/forms"
import TestRedux from "../pages/test/TestReduxContainer"
import CopyrightShare from "../pages/document/copyright"
import DashboardPage from "../pages/dashboard"
import { Platform } from "../platform"
import WebRoutes from "./web.routes"
import NativeRoutes from "./native.routes"

export default function Routes() {
	return (
		<Switch>
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
				<AccessControl redirectToLogin>
					<CopyrightShare />
				</AccessControl>
			</Route>

			{/*<Route path="/dashboard/">*/}
			{/*	<AccessControl redirectToLogin>*/}
			{/*		<DashboardPage />*/}
			{/*	</AccessControl>*/}
			{/*</Route>*/}

			<Route path="/test/forms" exact>
				<AccessControl redirectToLogin>
					<Scrollable>
						<FormsTest />
					</Scrollable>
				</AccessControl>
			</Route>

			<Route path="/test/reduxTest" exact>
				<Scrollable>
					<TestRedux />
				</Scrollable>
			</Route>
			{Platform.web && WebRoutes()}
			{/*{Platform.native && <>{...NativeRoutes}</>}*/}
		</Switch>
	)
}

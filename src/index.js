import React from "react"
import { Route, Redirect, Switch } from "react-router"

import { Overlay as GlobalOverlay } from "./portals"
import { Overlay as ScrollOverlay, Scrollable } from "./widgets/scrollable"

import Register from "./pages/auth/register"
import LoginContainer from "./pages/auth/LoginContainer"
import RegisterContainer from "./pages/auth/RegisterContainer"
import Logout from "./pages/auth/Logout"
import DashboardPage from "./pages/dashboard"
import NewUser from "./pages/auth/NewUserContainer"
import PasswordSent from "./pages/auth/forgot-password-sent"
import GetPasswordContainer from "./pages/auth/ForgotPasswordContainer"
import PasswordReset from "./pages/auth/password-reset"
import CheckEmailPage from "./pages/auth/check-email"
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

			<Route path="/auth/register" exact>
				<RegisterContainer />
			</Route>

			<Route path="/auth/login" exact>
				<LoginContainer />
			</Route>

			<Route path="/auth/logout" exact>
				<Logout />
			</Route>

			<Route path="/auth/forgot-password-sent" exact>
				<PasswordSent />
			</Route>

			<Route path="/auth/forgot-password" exact>
				<GetPasswordContainer />
			</Route>

			<Route path="/auth/password-reset" exact>
				<PasswordReset />
			</Route>

			<Route path="/auth/check-email" exact>
				<CheckEmailPage />
			</Route>

			<Route path="/auth/new-user" exact>
				<NewUser />
			</Route>

			<Route
				path="/user/activate/:token"
				exact
				component={UserActivateAccount}
			/>

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

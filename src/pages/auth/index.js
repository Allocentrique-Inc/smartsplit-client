import React from "react"
import { Switch, Route } from "react-router"
import Register from "./register"
import LoginPage from "./login"
import RegisterPage from "./register"
import Logout from "./Logout"
import NewUser from "./NewUserContainer"
import PasswordSent from "./forgot-password-sent"
import ForgotPassword from "./forgot-password"
import PasswordReset from "./password-reset"
import CheckEmailPage from "./check-email"
import AccessControl from "../../widgets/AccessControl"

export default function AuthPages() {
	return (
		<Switch>
			<Route path="/auth/register" exact>
				<RegisterPage />
			</Route>

			<Route path="/auth/login" exact>
				<LoginPage />
			</Route>

			<Route path="/auth/logout" exact>
				<Logout />
			</Route>

			<Route path="/auth/forgot-password-sent" exact>
				<PasswordSent />
			</Route>

			<Route path="/auth/forgot-password" exact>
				<ForgotPassword />
			</Route>

			<Route path="/auth/check-email" exact>
				<CheckEmailPage />
			</Route>

			<Route path="/auth/new-user" exact>
				<AccessControl redirectToLogin>
					<NewUser />
				</AccessControl>
			</Route>

			<Route
				path="/user/change-password/:token"
				exact
				component={PasswordReset}
			/>
		</Switch>
	)
}

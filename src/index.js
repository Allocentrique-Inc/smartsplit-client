import React from "react"
import { Route, Redirect, Switch }  from "react-router"

import { Overlay as GlobalOverlay } from "./portals"
import { Overlay as ScrollOverlay, Scrollable } from "./widgets/scrollable"

import Register       	  	from "./pages/auth/register"
import Login          	  	from "./pages/auth/login"
import NewUser            	from "./pages/auth/new-user"
import PasswordSent	  	  	from "./pages/auth/forgot-password-sent"
import GetPassword	  	  	from "./pages/auth/forgot-password"
import PasswordReset		from "./pages/auth/password-reset"
import CheckEmailModal		from "./pages/auth/check-email"
import DashboardPage      	from "./pages/dashboard"
import FormsTest          	from "./pages/test/forms"
import CopyrightShare     	from "./pages/document/copyright"

import ChangePasswordModal from "./pages/dashboard/change-password"

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
			{/* <Redirect to="/dashboard/" /> */}
			<Redirect to="/auth/register" />
		</Route>
		
		<Route path="/auth/register" exact>
			<Register />
		</Route>

		<Route path="/auth/login" exact>
			<Login />
		</Route>

		<Route path="/auth/forgot-password-sent" exact>
			<PasswordSent />
		</Route>

		<Route path="/auth/forgot-password" exact>
			<GetPassword />
		</Route>

		<Route path="/auth/password-reset" exact>
			<PasswordReset />
		</Route>

		<Route path="/auth/check-email" exact>
			<CheckEmailModal />
		</Route>

		<Route path="/auth/new-user" exact>
			<NewUser />
		</Route>

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
}

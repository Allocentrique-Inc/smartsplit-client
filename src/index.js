import React from "react"
import { Route, Redirect, Switch } from "react-router"

import { Overlay as GlobalOverlay } from "./portals"
import { Overlay as ScrollOverlay, Scrollable } from "./widgets/scrollable"
import DashboardPage from "./pages/dashboard"
import FormsTest from "./pages/test/forms"

export default function Main(props) {
	return <GlobalOverlay.ProviderContainer>
		<ScrollOverlay.ProviderContainer>
			<MainRouter {...props} />
		</ScrollOverlay.ProviderContainer>
	</GlobalOverlay.ProviderContainer>
}

export function MainRouter(props) {
	return <Switch>
		<Route path="/" exact>
			<Redirect to="/dashboard/" />
		</Route>

		<Route path="/dashboard/">
			<DashboardPage />
		</Route>

		<Route path="/test/forms" exact>
			<Scrollable>
				<FormsTest />
			</Scrollable>
		</Route>
	</Switch>
}

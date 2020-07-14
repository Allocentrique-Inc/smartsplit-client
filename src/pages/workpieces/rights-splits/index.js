import React from "react"
import { Switch, Route } from "react-router"
import CopyrightPage from "./copyright"
import PerformancePage from "./performance"

export default function (props) {
	return (
		<Switch>
			<Route path="/workpieces/page1">
				<CopyrightPage {...props} />
			</Route>
			<Route path="/workpieces/performance">
				<PerformancePage />
			</Route>
		</Switch>
	)
}

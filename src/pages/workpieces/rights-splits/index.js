import React from "react"
import { Switch, Route } from "react-router"
import CopyrightPage from "./copyright"
import SplitSummary from "./summary"

export default function (props) {
	return (
		<Switch>
			<Route path="/workpieces/page1">
				<CopyrightPage {...props} />
			</Route>

			<Route path="/workpieces/summary">
				<SplitSummary />
			</Route>
		</Switch>
	)
}

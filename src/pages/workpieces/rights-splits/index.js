import React from "react"
import { Switch, Route } from "react-router"
import CopyrightPage from "./copyright"
import PerformancePage from "./performance"
import PerformancePagePart2 from "./performance-part2"

export default function (props) {
	return (
		<Switch>
			<Route path="/workpieces/page1">
				<CopyrightPage {...props} />
			</Route>
			<Route path="/workpieces/performance1">
				<PerformancePage />
			</Route>
			<Route path="/workpieces/performance2">
				<PerformancePagePart2 />
			</Route>
		</Switch>
	)
}

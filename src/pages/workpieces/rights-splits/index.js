import React from "react"
import CopyrightPage from "./copyright"
import SplitSummary from "../../document/split-summary"

export default function (props) {
	return (
		<Switch>
			<Route path="/workpieces/page1">
				<CopyrightPage {...props} />
			</Route>

			<Route path="/split-summary">
				<SplitSummary />
			</Route>
		</Switch>
	)
}

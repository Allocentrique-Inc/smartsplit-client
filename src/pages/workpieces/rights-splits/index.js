import React from "react"
import { Switch, Route } from "react-router"
import CopyrightPage from "./copyright"
import RecordingPage from "./recording1"

export default function (props) {
	return (
		<Switch>
			<Route path="/workpieces/page1">
				<CopyrightPage {...props} />
			</Route>
			<Route path="/workpieces/recording1">
				<RecordingPage />
			</Route>
		</Switch>
	)
}

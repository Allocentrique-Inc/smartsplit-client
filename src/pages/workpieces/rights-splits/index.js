import React from "react"
import { Switch, Route, Redirect } from "react-router"
import CopyrightPage from "./copyright"
import InterpretationPage from "./interpretation"
import RecordingPage from "./recording"
import Performance from "../documentation/performance"
import Files from "../documentation/files"

export default function (props) {
	return (
		<Switch>
			<Route
				path="/workpieces/:workpiece_id/rights-splits"
				exact
				component={RedirectToCopyright}
			/>
			<Route
				path="/workpieces/:workpiece_id/rights-splits/copyright"
				component={CopyrightPage}
			/>
			<Route
				path="/workpieces/:workpiece_id/rights-splits/interpretation"
				component={InterpretationPage}
			/>
			<Route
				path="/workpieces/:workpiece_id/rights-splits/recording"
				component={RecordingPage}
			/>
			<Route
				path="/workpieces/:workpiece_id/documentation/performance"
				component={Performance}
			/>
			<Route
				path="/workpieces/:workpiece_id/documentation/files"
				component={Files}
			/>
		</Switch>
	)
}

export function RedirectToCopyright({ match }) {
	return (
		<Redirect
			to={`/workpieces/${match.params.workpiece_id}/rights-splits/copyright`}
		/>
	)
}

import React from "react"
import { Switch, Route, Redirect, generatePath } from "react-router"

import RightsSplitsForm from "./rights-splits"
import ProtectWork from "./protect"

export default function WorkpiecesRouter() {
	return (
		<Switch>
			<Route path="/workpieces/:workpiece_id" exact component={DefaultRoute} />
			<Route path="/workpieces/:workpiece_id/rights-splits">
				<RightsSplitsForm workpiece={demoPiece} />
			</Route>

			<Route path="/workpieces/:workpiece_id/protect">
				<ProtectWork workpiece={demoPiece} />
			</Route>
		</Switch>
	)
}

export function DefaultRoute({ match }) {
	const redirect = generatePath(
		"/workpieces/:workpiece_id/rights-splits",
		match.params
	)

	return <Redirect to={redirect} />
}

export const demoPiece = {
	title: "Titre de la pièce",
}

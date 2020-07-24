import React from "react"
import {
	Switch,
	Route,
	Redirect,
	generatePath,
	useRouteMatch,
	useParams,
} from "react-router"

import { useStorePath } from "../../appstate/react"
import { WorkpieceContext } from "./context"
import RightsSplitsForm from "./rights-splits"
import ProtectWork from "./protect"

export default function WorkpiecesRouter() {
	const match = useRouteMatch("/workpieces/:workpiece_id")
	const workpiece = useStorePath("workpieces").fetch(match.params.workpiece_id)

	return (
		<WorkpieceContext.Provider value={workpiece}>
			<Switch>
				<Route
					path="/workpieces/:workpiece_id"
					exact
					component={DefaultRoute}
				/>
				<Route path="/workpieces/:workpiece_id/rights-splits">
					<RightsSplitsForm />
				</Route>

				<Route path="/workpieces/:workpiece_id/protect">
					<ProtectWork />
				</Route>
			</Switch>
		</WorkpieceContext.Provider>
	)
}

export function DefaultRoute() {
	const redirect = generatePath(
		"/workpieces/:workpiece_id/rights-splits",
		useParams()
	)

	return <Redirect to={redirect} />
}

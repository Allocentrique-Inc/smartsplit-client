import React from "react"
import { Switch, Route } from "react-router"

import RightsSplitsForm from "./rights-splits"

export default function WorkpiecesRouter() {
	return (
		<Switch>
			<Route>
				<RightsSplitsForm workpiece={demoPiece} />
			</Route>
		</Switch>
	)
}

export const demoPiece = {
	title: "Titre de la pièce",
}

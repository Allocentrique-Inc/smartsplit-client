import React from "react"
import { Switch, Route } from "react-router"
import CopyrightPage from "./copyright"
import WorkpieceSheet from "../workpiece-summary/workpiece-sheet"

export default function (props) {
	return (
		<Switch>
			<Route path="/workpieces/page1">
				<CopyrightPage {...props} />
			</Route>

			<Route path="/workpieces/workpiece-sheet">
				<WorkpieceSheet />
			</Route>
		</Switch>
	)
}

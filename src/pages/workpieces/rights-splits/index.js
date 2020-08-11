import React from "react"
import { Switch, Route } from "react-router"
import CopyrightPage from "./copyright"
import DocumentCreation from "../documentation/document-creation"

export default function (props) {
	return (
		<Switch>
			<Route path="/workpieces/page1">
				<CopyrightPage {...props} />
			</Route>

			<Route path="/documentation/document-creation">
				<DocumentCreation />
			</Route>
		</Switch>
	)
}

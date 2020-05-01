import React from "react"
import { Route } from "react-router"
import { DashboardLayout } from "../layouts/dashboard.layout"
import PublicPageLayout from "../layouts/public-page"
import AccessControl from "../components/AccessControl"

export default function RouteWrapper(props) {
	const { component, isPrivate, ...rest } = props
	const ChildComponent = component
	function renderRoute() {
		return (
			<Route
				{...rest}
				render={(pageProps) => (
						<ChildComponent {...pageProps} />
				)}
			/>
		)
	}
	if (isPrivate) {
		return <AccessControl redirectToLogin>{renderRoute()}</AccessControl>
	} else {
		return renderRoute()
	}
}

import React, { useEffect, useMemo } from "react"
import { Route, Redirect, Switch } from "react-router"
import { StoreProvider, createAppStore } from "./appstate"
import { useSubpath } from "./appstate/react"
import { useStores } from "./mobX"
import { setGlobalAccessToken, setGlobalErrorHandler } from "../api/api-client"
import { Overlay as GlobalOverlay } from "./portals"
import { Overlay as ScrollOverlay, Scrollable } from "./widgets/scrollable"
import AuthPages from "./pages/auth"
import DashboardPage from "./pages/dashboard"
import TestDashboard from "./pages/test"
import CopyrightShare from "./pages/document/copyright"
import UserActivateAccount from "./pages/user/activate"
import AccessControl from "./widgets/AccessControl"
import UserSettings from "./pages/user/settings"
import AdminPage from "./pages/admin"
import WorkpiecesRouter from "./pages/workpieces"
import { observer } from "mobx-react"
window.makeObservable = function (instance) {}
// TMP keep redux for now
// import { Provider } from "react-redux"
// import { createStore, applyMiddleware } from "redux"

// import thunk from "redux-thunk"
// import rootReducer from "../redux/root-reducer"
// const reduxStore = createStore(rootReducer, applyMiddleware(thunk))
// /TMP

export default observer(function Main(props) {
	const store = useMemo(() => createAppStore(), [])
	const { auth } = useStores()

	return auth.isLoggedIn === null ? null : (
		<StoreProvider value={store}>
			<ScrollOverlay.ProviderContainer>
				<GlobalOverlay.ProviderContainer>
					<MainRouter {...props} />
				</GlobalOverlay.ProviderContainer>
			</ScrollOverlay.ProviderContainer>
		</StoreProvider>
	)
})

export function MainRouter() {
	const { auth } = useStores()
	return (
		<Switch>
			<Route path="/" exact>
				{auth.goToNewUser ? (
					<Redirect to={"/auth/new-user"} />
				) : (
					<Redirect to="/dashboard/" />
				)}
			</Route>

			<Route path="/auth/">
				<AuthPages />
			</Route>

			<Route
				path="/user/activate/:token"
				exact
				component={UserActivateAccount}
			/>

			<Route path="/user/change-password/:token" exact component={AuthPages} />

			<Route path="/admin">
				<AccessControl redirectToLogin>
					<AdminPage />
				</AccessControl>
			</Route>

			<Route path="/dashboard/">
				<AccessControl redirectToLogin>
					<DashboardPage />
				</AccessControl>
			</Route>

			<Route path="/user/settings">
				<UserSettings />
			</Route>

			<Route path="/test/">
				<TestDashboard />
			</Route>

			<Route path="/workpieces">
				<AccessControl redirectToLogin>
					<WorkpiecesRouter />
				</AccessControl>
			</Route>
		</Switch>
	)
}

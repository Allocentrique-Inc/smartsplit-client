import React, { useEffect, useMemo } from "react"
import { Route, Redirect, Switch } from "react-router"
import { StoreProvider, createAppStore } from "./appstate"
import { useSubpath } from "./appstate/react"
import { setGlobalAccessToken, setGlobalErrorHandler } from "../api/api-client"

import { Overlay as GlobalOverlay } from "./portals"
import { Overlay as ScrollOverlay, Scrollable } from "./widgets/scrollable"

import AuthPages from "./pages/auth"
import DashboardPage from "./pages/dashboard"
import FormsTest from "./pages/test/forms"
import CopyrightShare from "./pages/document/copyright"
import UserActivateAccount from "./pages/user/activate"

import AccessControl from "./widgets/AccessControl"

import UserSettings from "./pages/user/settings"
import AdminPage from "./pages/admin"
import WorkpiecesRouter from "./pages/workpieces"

// TMP keep redux for now
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "../redux/root-reducer"
const reduxStore = createStore(rootReducer, applyMiddleware(thunk))
// /TMP

export default function Main(props) {
	const store = useMemo(() => createAppStore(), [])
	const isLoggedIn = useSubpath(store, "auth", "isLoggedIn")

	useEffect(() => {
		setGlobalErrorHandler((e) => store.auth.logout(e))

		return store.auth.subscribe(() => {
			setGlobalAccessToken(store.auth.accessToken)
		})
	}, [store])

	useEffect(() => {
		store.auth.initializeFromStorage(true)
	}, [])

	return isLoggedIn === null ? null : (
		<Provider store={reduxStore}>
			<StoreProvider value={store}>
				<ScrollOverlay.ProviderContainer>
					<GlobalOverlay.ProviderContainer>
						<MainRouter {...props} />
					</GlobalOverlay.ProviderContainer>
				</ScrollOverlay.ProviderContainer>
			</StoreProvider>
		</Provider>
	)
}

export function MainRouter(props) {
	return (
		<Switch>
			<Route path="/" exact>
				<Redirect to="/dashboard/" />
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

			<Route path="/test/forms" exact>
				<Scrollable>
					<FormsTest />
				</Scrollable>
			</Route>

			<Route path="/workpieces">
				<WorkpiecesRouter />
			</Route>
		</Switch>
	)
}

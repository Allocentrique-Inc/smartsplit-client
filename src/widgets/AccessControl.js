import React from "react"
import { Text } from "../text"
import { observer } from "mobx-react"
//import { useStorePath } from "../appstate/react"
import { useStores } from "../mobX"
import { useHistory } from "react-router"

export default observer(function AccessControl({ children, redirectToLogin }) {
	const history = useHistory()
	const { auth } = useStores()

	if (auth.isLoggedIn === true) {
		return children
	} else {
		if (redirectToLogin) {
			history.push(auth.isReturning ? "/auth/login" : "/auth/register")
		}

		return <Text error>Access to this location requires to be logged in</Text>
	}
})

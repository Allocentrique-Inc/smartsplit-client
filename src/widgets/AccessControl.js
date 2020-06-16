import React from "react"
import { Text } from "../text"
import { useStorePath } from "../appstate/react"
import { useHistory } from "react-router"

export default function AccessControl({ children, redirectToLogin }) {
	const history = useHistory()
	const auth = useStorePath("auth")

	if (auth.isLoggedIn === true) {
		return children
	} else {
		if (redirectToLogin) {
			history.push(auth.isReturning ? "/auth/login" : "/auth/register")
		}

		return <Text error>Access to this location requires to be logged in</Text>
	}
}

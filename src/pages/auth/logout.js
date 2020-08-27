import React, { useEffect } from "react"
import { useHistory } from "react-router"
import { useStorePath } from "../../appstate/react"
import { useStores } from "../../mobX"

export default function Logout() {
	//const auth = useStorePath("auth")
	const { auth } = useStores()
	const history = useHistory()

	useEffect(() => {
		auth.logout()
		history.push("/auth/login")
	}, [auth, history])

	return null
}

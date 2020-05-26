import React, { useEffect } from "react"
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import { logout } from "../../../redux/auth/actions"

export default function Logout() {
	const history = useHistory()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(logout())
		history.push("/auth/login")
	}, [dispatch, history])

	return null
}

import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { useUser } from "../users/hooks"

export function useAuth() {
	return useSelector((state) => state.auth)
}

export function useAuthStatus() {
	return useSelector((state) => state.auth && state.auth.isLoggedIn)
}

export function useAuthUser() {
	const history = useHistory()
	const auth = useAuth()

	return useUser(auth.user_id)
}

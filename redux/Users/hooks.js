import { useEffect } from "react"
import { useApiRedux } from "../api"
import Users from "./Actions"

export function useUser(id) {
	return useApiRedux(Users, "users", id)
}

export function useSessionUser(...args) {
	const id = "session" // TODO: get from auth
	return useUser(id, ...args)
}

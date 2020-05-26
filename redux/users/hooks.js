import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useApiRedux } from "../api"
import Users from "./actions"

export function useUser(id) {
	return useApiRedux(Users, "users", id)
}

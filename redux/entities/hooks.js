import { useApiRedux } from "../api"

import Entities, { listEntities } from "./actions"
import { useDispatch, useSelector } from "react-redux"

export function useEntityList(type) {
	const dispatch = useDispatch()
	const entityList = useSelector((state) => state.entities.entityList)
	if ((!entityList.data && !entityList.isLoading) || entityList.type !== type) {
		dispatch(listEntities(type))
	}
	return { ...entityList }
}

export function useEntity(id, initData = null) {
	return useApiRedux(Entities, "entities", id, initData)
}

import { useStorePath } from "./index"

export function useEntity(paths, entityId) {
	const entityList = useStorePath(...paths)
	entityList.fetch(entityId)
	return entityList ? entityList.get(entityId) : null
}

export  function useAuthUser() {
	const auth = useStorePath("auth")
	return auth.user
}
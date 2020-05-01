import { axiosClient } from "./ApiClient"

export function getRightHolders(axiosConfig = {}) {
	return axiosClient.request({
		url: "/rightHolders",
		method: "get",
		...axiosConfig,
	})
}

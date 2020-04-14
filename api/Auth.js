import {axiosClient} from "./ApiClient"

export function loginUser(data, axiosConfig = {}) {
	return axiosClient.request({
		url: '/auth/login',
		method: "post",
		data,
		...axiosConfig,
	})
}

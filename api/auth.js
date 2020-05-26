import { client } from "./ApiClient"

export function login(email, password, expire = "2 hours") {
	return client.request({
		url: "/auth/login",
		method: "post",
		data: { email, password, expire },
	})
}

export function refresh() {
	return client.get("/auth/refresh")
}

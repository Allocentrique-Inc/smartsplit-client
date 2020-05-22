import { client } from "./api-client"

export async function login(email, password, expire = "2 hours") {
	const response = await client.request({
		url: "/auth/login",
		method: "post",
		data: { email, password, expire },
	})

	return response.data
}

export async function refresh() {
	const response = await client.get("/auth/refresh")
	return response.data
}

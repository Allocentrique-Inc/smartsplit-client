import { client } from "./api-client"

export async function searchRightHolders(terms) {
	const result = await client.request({
		method: "get",
		url: "/rightHolders",
		params: {
			search_terms: terms,
		},
	})

	return result.data
}

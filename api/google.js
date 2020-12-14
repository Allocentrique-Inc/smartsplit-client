import Axios from "axios"
import { GOOGLE_API_KEY, GOOGLE_AUTOCOMPLETE_PARAMS } from "../config"

/**
 * function to get autocomplete results (5) for searches of businesses
 *
 * this is used in particular to
 *
 * @param term
 * @return {Promise<void>}
 */
export async function googlePlaceAutocomplete(term) {
	term = encodeURI(term)
	const URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${term}&types=establishment&components=${GOOGLE_AUTOCOMPLETE_PARAMS.components}`
	try {
		const response = await Axios.get(URL)
		return response.data
	} catch (e) {
		console.error(e)
		return { ok: false, pre }
	}
}

export async function googlePlaceDetails(placeId) {
	const URL = `https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}`
	try {
		const response = await Axios.get(URL)
		return response.data
	} catch (e) {
		console.error(e)
	}
}

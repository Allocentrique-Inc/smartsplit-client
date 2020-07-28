export function splitDataUri(uri) {
	if (typeof uri !== "string") {
		throw new Error("Invalid URI provided: not a string")
	}

	if (uri.indexOf("data:") !== 0) {
		throw new Error("Invalid URI provided: does not start with `data:`")
	}

	const comma_index = uri.indexOf(",")

	if (comma_index < 0) {
		throw new Error("Invalid URI provided: does not have a comma delimiter")
	}

	const [contentType, format] = uri.substr(5, comma_index - 5).split(";")

	if (format !== "base64") {
		throw new Error("Unsupported URI provided: not in base64 format")
	}

	const encodedData = uri.substr(comma_index + 1)

	return { contentType, format, encodedData }
}

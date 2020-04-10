export function notEmptyValidator(str) {
	return str.trim() != ''
}

export function sameValidator(str1, str2) {
	return str1.trim() === str2.trim()
}

export function differentValidator(str1, str2) {
	return str1.trim() !== str2.trim()
}
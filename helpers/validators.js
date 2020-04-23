export function notEmptyValidator(str) {
	return str.trim() != ""
}

export function sameValidator(str1, str2) {
	return str1.trim() === str2.trim()
}

export function differentValidator(str1, str2) {
	return str1.trim() !== str2.trim()
}

export function emailValidator(str) {
	return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
		str
	)
}

export function acceptablePasswordValidator(str) {
	return str.trim().length >= 8
}

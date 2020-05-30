import React, { useState } from "react"
import TextField from "./text"
import { parsePhoneNumberFromString } from "libphonenumber-js"
import { useTranslation } from "react-i18next"

export function PhoneNumberField(props) {
	const { value, onChangeText, ...nextProps } = props
	const [isValid, setIsValid] = useState(false)
	const [error, setError] = useState(null)
	const { t } = useTranslation()

	function handleOnBlur() {
		const parsedPhone = parsePhoneNumberFromString(value || "", "CA")
		setError(parsedPhone ? null : t("errors:invalidPhoneNumber"))
		setIsValid(!!parsedPhone)
		onChangeText(parsedPhone ? parsedPhone.number : "")
	}

	function handleOnFocus() {
		if (isValid) {
			setIsValid(false)
			onChangeText(toDisplayNumber(value))
		}
		if (error) {
			setError(null)
		}
	}

	function toDisplayNumber(phoneNumber) {
		const parsedPhone = parsePhoneNumberFromString(phoneNumber, "CA")
		return parsedPhone.formatNational()
	}

	return (
		<TextField
			keyboardType="phone-pad"
			textContentType="telephoneNumber"
			autocompletetype="tel"
			value={isValid ? toDisplayNumber(value) : value || ""}
			error={error || props.error}
			onChangeText={onChangeText}
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
			{...nextProps}
		/>
	)
}

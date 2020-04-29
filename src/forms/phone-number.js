import React from "react"
import TextField from "./text"
import { parsePhoneNumberFromString } from "libphonenumber-js"

export function PhoneNumberField(props) {
	const { value, onChangeText, ...nextProps } = props
	function handleOnBlur() {
		const phoneNumber = parsePhoneNumberFromString(value, "CA")
		onChangeText(phoneNumber ? phoneNumber.formatNational() : "")
	}
	return (
		<TextField
			keyboardType="phone-pad"
			textContentType="telephoneNumber"
			autocompletetype="tel"
			value={value}
			onChangeText={onChangeText}
			onBlur={handleOnBlur}
			{...nextProps}
		/>
	)
}

export function getStandardPhoneNumber(inputValue) {
	const phoneNumber = parsePhoneNumberFromString(inputValue, "CA")
	return phoneNumber ? phoneNumber.number : ""
}

import React, { useState } from "react"
import TextField from "./text"
import moment from "moment"
import { useTranslation } from "react-i18next"

const ISOFormat = "YYYY-MM-DD"
const displayFormat = "DD-MM-YYYY"
const defaultPlaceholder = "DDMMYYYY"
const formats = [
	displayFormat,
	ISOFormat,
	"DDMMYYYY",
	"DD/MM/YYYY",
	"DD MM YYYY",
]

export function DateField(props) {
	const [isValid, setIsValid] = useState(false)
	const { value, onChangeText, placeholder, ...nextProps } = props
	const [error, setError] = useState(null)
	const { t } = useTranslation()

	function handleOnBlur() {
		const parsedDate = moment(value, formats)
		setError(parsedDate.isValid() ? null : t("errors:invalidDate"))
		setIsValid(parsedDate.isValid())
		onChangeText(parsedDate.isValid() ? parsedDate.format(ISOFormat) : "")
	}

	function handleOnFocus() {
		if (isValid) {
			setIsValid(false)
			onChangeText(toDisplayDate(value))
		}
		if (error) {
			setError(null)
		}
	}

	function toDisplayDate(dateString) {
		const parsedDate = moment(dateString, formats)
		return parsedDate.isValid() ? parsedDate.format(displayFormat) : ""
	}

	return (
		<TextField
			keyboardType="phone-pad"
			value={isValid ? toDisplayDate(value) : value}
			error={error || props.error}
			onChangeText={onChangeText}
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
			placeholder={placeholder ? placeholder : defaultPlaceholder}
			{...nextProps}
		/>
	)
}

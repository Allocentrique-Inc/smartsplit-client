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
	defaultPlaceholder,
	"DD/MM/YYYY",
	"DD MM YYYY",
]

export function DateField(props) {
	const [isValid, setIsValid] = useState(false)

	let {
		fieldError,
		field,
		label,
		value,
		onChangeText,
		placeholder,
		...nextProps
	} = props
	const { t } = useTranslation()
	if (field) {
		onChangeText = (v) => {
			field.setValue(v)
		}
		fieldError = field.model.validated && field.error
		label = t(field.label)
		value = field.value
	}
	const [error, setError] = useState(null)

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
			error={error || fieldError}
			onChangeText={onChangeText}
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
			placeholder={placeholder ? placeholder : defaultPlaceholder}
			label={label}
			{...nextProps}
		/>
	)
}

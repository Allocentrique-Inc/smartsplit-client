import React, { useState, useEffect, useCallback } from "react"
import TextField from "./text"
import { parsePhoneNumberFromString } from "libphonenumber-js"
import { useTranslation } from "react-i18next"

import MoreHorizontal from "../../assets/svg/more-horizontal.svg"
import CheckMark from "../svg/check-mark"
import { Colors } from "../theme"
import { observer } from "mobx-react"
export const StatusIcon = {
	unverified: <MoreHorizontal />,
	pending: <MoreHorizontal />,
	active: <CheckMark />,
	verified: <CheckMark color={Colors.action} />,
}

export const PhoneNumberField = observer((props) => {
	let { value, onChangeText, status, after, ...nextProps } = props
	console.log(`value in Phone number field is ${toDisplayNumber(value)}`)
	const { t } = useTranslation()

	const [currentValue, setCurrentValue] = useState(value || "")
	const [fieldValue, setFieldValue] = useState(toDisplayNumber(value) || "")
	const [isFocused, setIsFocused] = useState(false)
	const [error, setError] = useState(null)

	const handleChange = useCallback(
		(number) => {
			setFieldValue(number)

			const parsed = toInternational(number)

			if (parsed && parsed !== currentValue) {
				onChangeText && onChangeText(parsed)
				setCurrentValue(parsed)
			}
		},
		[currentValue]
	)

	const handleOnBlur = useCallback(() => {
		const formattedNumber = toDisplayNumber(fieldValue)

		setError(
			fieldValue === "" || formattedNumber
				? null
				: t("errors:invalidPhoneNumber")
		)
		setFieldValue(formattedNumber || fieldValue)
	}, [fieldValue])

	useEffect(() => {
		if (value !== currentValue) {
			setCurrentValue(value)
			handleOnBlur()
		}
	}, [value, currentValue])

	return (
		<TextField
			keyboardType="phone-pad"
			textContentType="telephoneNumber"
			autocompletetype="tel"
			{...nextProps}
			value={fieldValue}
			error={error || props.error}
			onChangeText={handleChange}
			onBlur={handleOnBlur}
			after={
				<>
					{StatusIcon[status]}
					{after}
				</>
			}
		/>
	)
})

export function toInternational(number) {
	if (!number) return
	const parsed = parsePhoneNumberFromString(number, "CA")
	return parsed && parsed.number
}

export function toDisplayNumber(number) {
	if (!number) return
	const parsed = parsePhoneNumberFromString(number, "CA")
	return parsed && parsed.formatNational()
}

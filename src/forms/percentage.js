import React, { useState, useEffect } from "react"
import { TextInput } from "react-native"
import { observer } from "mobx-react"
import { percentageValidator } from "../../helpers/validators"
import { formatPercentage } from "../utils/utils"
import TypographyStyles from "../styles/typography"

const PercentageInput = observer((props) => {
	const {
		viewRef,
		style,
		value,
		onChange,
		digits,
		disabled,
		...nextProps
	} = props
	//console.log(nextProps)
	const [displayValue, setDisplayValue] = useState("")

	const baseStyle = {
		width: 58,
		fontSize: 16,
		lineHeight: 24,
		cursor: disabled ? "not-allowed" : "pointer",
	}

	function onBlur() {
		let isValid = percentageValidator(displayValue)
		const parsedValue = Number.parseFloat(displayValue)
		if (isValid && !!onChange && parsedValue !== value) {
			onChange(Number.parseFloat(displayValue))
			setDisplayValue(formatPercentage(Number.parseFloat(displayValue)))
		} else {
			setDisplayValue(formatPercentage(value))
		}
	}

	//Update displayed value on prop value change
	useEffect(() => {
		setDisplayValue(formatPercentage(value, value === 100 ? 1 : 2))
	}, [value])

	return (
		<TextInput
			{...nextProps}
			value={displayValue}
			onChangeText={setDisplayValue}
			onBlur={onBlur}
			onFocus={() =>
				setDisplayValue(value.toFixed(digits ? digits : 0).toString())
			}
			disabled={disabled}
			style={[
				TypographyStyles.text.base,
				TypographyStyles.text.bold,
				baseStyle,
				style,
			]}
			ref={viewRef}
		/>
	)
})

export default PercentageInput

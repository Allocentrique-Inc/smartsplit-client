import React, { useState, useEffect } from "react"
import { TextInput } from "react-native"
import { observer } from "mobx-react"
import { percentageValidator } from "../../helpers/validators"
import { formatPercentage } from "../utils/utils"
import FormStyles from "../styles/forms"

export const PercentageInput = observer((props) => {
	const { viewRef, style, value, onChange, digits, ...nextProps } = props
	//console.log(nextProps)
	const [displayValue, setDisplayValue] = useState("")

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
		setDisplayValue(formatPercentage(value))
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
			style={[FormStyles.input_text, style]}
			ref={viewRef}
		/>
	)
})

export default PercentageInput

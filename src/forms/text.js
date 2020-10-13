import React from "react"
import { TextInput } from "react-native"
import Label from "./label"
import Frame, { useFrameFocus } from "./frame"
import FormStyles from "../styles/forms"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"

const FramedTextField = observer(
	({ error, before, after, layout, ...inputProps }) => {
		const focused = useFrameFocus(false, inputProps)

		return (
			<Frame {...layout} focused={focused.value} error={error}>
				{before}
				<BasicTextField {...inputProps} {...focused.props} />
				{after}
			</Frame>
		)
	}
)

export const BasicTextField = observer((props) => {
	const { t } = useTranslation()
	const { viewRef, style, ...nextProps } = props
	//console.log(nextProps)
	return (
		<TextInput
			{...nextProps}
			style={[FormStyles.input_text, style]}
			ref={viewRef}
		/>
	)
})

const TextField = observer(function (props) {
	const { t } = useTranslation()
	let addProps = {}
	const { field } = props
	if (field) {
		addProps = {
			label: t(field.label),
			onChangeText: (text) => {
				//console.log(text)
				field.setValue(text)
			},
			onChange: (e) => {
				//console.log(field + " has changed")
			},
			error: field.model.validated && t(field.error),
			value: field.value,
		}
	}

	const newProps = { ...props, ...addProps }
	return <Label {...newProps} component={FramedTextField} />
})
export default TextField

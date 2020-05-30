import React from "react"
import { TextInput } from "react-native"
import Label from "./label"
import Frame, { useFrameFocus } from "./frame"
import FormStyles from "../styles/forms"

function FramedTextField({ error, before, after, layout, ...inputProps }) {
	const focused = useFrameFocus(false, inputProps)

	return (
		<Frame {...layout} focused={focused.value} error={error}>
			{before}
			<BasicTextField {...inputProps} {...focused.props} />
			{after}
		</Frame>
	)
}

export function BasicTextField(props) {
	const { viewRef, ...nextProps } = props

	return (
		<TextInput
			{...nextProps}
			style={[FormStyles.input_text, props.style]}
			ref={viewRef}
		/>
	)
}

export default function TextField(props) {
	return <Label {...props} component={FramedTextField} />
}

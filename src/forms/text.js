import React from "react"
import { TextInput } from "react-native"
import Label from "./label"
import Frame, { useFrameFocus } from "./frame"
import FormStyles from "../styles/forms"

function TextFieldRender(props) {
	const focused = useFrameFocus()

	return (
		<Frame focused={focused.value}>
			<BasicTextField {...props} {...focused.props} />
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
	return <Label {...props} component={TextFieldRender} />
}

import React from "react"
import { TextInput } from "react-native"
import Label from "./label"
import Frame, { useFrameFocus } from "./frame"
import FormStyles from "../styles/forms"

function TextFieldRender(props) {
	const focused = useFrameFocus()

	return <Frame focused={focused.value}>
		<TextInput
			{...props}
			style={FormStyles.input_text}
			{...focused.props}
		/>
	</Frame>
}

export default function TextField(props) {
	return <Label {...props} component={TextFieldRender} />
}

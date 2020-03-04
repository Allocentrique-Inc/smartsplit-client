import React from "react"
import { TextInput } from "react-native"
import Labeled from "./labeled"
import Framed, { useFrameFocus } from "./framed"
import FormStyles from "../../../styles/forms"

function TextFieldRender(props) {
	const focused = useFrameFocus()

	return <Framed focused={focused.value}>
		<TextInput
			{...props}
			style={FormStyles.input_text}
			{...focused.props}
		/>
	</Framed>
}

export default function TextField(props) {
	return <Labeled {...props} component={TextFieldRender} />
}

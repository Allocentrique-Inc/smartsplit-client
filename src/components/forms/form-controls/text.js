import React from "react"
import { TextInput } from "react-native"
import Wrapper from "./wrapper"
import Frame, { useFrameFocus } from "./frame"
import FormStyles from "../../../styles/forms"

function FramedTextField(props) {
	const { error, ...inputProps } = props
	const focused = useFrameFocus(false, inputProps)

	return (
		<Frame focused={focused.value} error={error}>
			<BasicTextField {...inputProps} {...focused.props} />
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
	return <Wrapper {...props} component={FramedTextField} />
}

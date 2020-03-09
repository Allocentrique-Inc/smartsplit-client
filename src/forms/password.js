import React, { useState } from "react"
import { TextInput, StyleSheet, TouchableWithoutFeedback } from "react-native"

import FormStyles from "../styles/forms"
import Label from "./label"
import Frame, { useFrameFocus } from "./frame"
import EyeIcon from "../svg/eye"

function FramedPasswordField(props) {
	const focused = useFrameFocus()
	const [reveal, setReveal] = useState(false)

	function toggleRevealPassword(e) {
		e.preventDefault()
		e.stopPropagation()
		setReveal(!reveal)
	}

	return <Frame focused={focused.value}>
		<TextInput
			{...props}
			style={FormStyles.input_text}
			secureTextEntry={!reveal}
			{...focused.props}
		/>
		
		<TouchableWithoutFeedback onPress={toggleRevealPassword}>
			<EyeIcon
				blocked={reveal}
				onClick={toggleRevealPassword}
				accessibilityRole="button"
			/>
		</TouchableWithoutFeedback>
	</Frame>
}

export default function PasswordField(props) {
	return <Label {...props} component={FramedPasswordField} />
}

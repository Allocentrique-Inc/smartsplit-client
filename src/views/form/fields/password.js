import React, { useState } from "react"
import { TextInput, StyleSheet, TouchableWithoutFeedback } from "react-native"

import FormStyles from "../../../styles/forms"
import Labeled from "./labeled"
import Framed, { useFrameFocus } from "./framed"
import EyeIcon from "../../../components/svg/eye"

function FramedPasswordField(props) {
	const focused = useFrameFocus()
	const [reveal, setReveal] = useState(false)

	function toggleRevealPassword(e) {
		e.preventDefault()
		e.stopPropagation()
		setReveal(!reveal)
	}

	return <Framed focused={focused.value}>
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
	</Framed>
}

export default function PasswordField(props) {
	return <Labeled {...props} component={FramedPasswordField} />
}

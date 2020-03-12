import React, { useState } from "react"
import {
	View,
	TextInput,
	StyleSheet,
	TouchableWithoutFeedback
} from "react-native"

import FormStyles from "../styles/forms"
import Label from "./label"
import Frame, { useFrameFocus } from "./frame"
import EyeIcon from "../svg/eye"
import { Metrics } from "../theme"

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

		<TouchableWithoutFeedback
			hitSlop={Metrics.hitSlop}
			onPress={toggleRevealPassword}
			accessibilityRole="button"
		>
			<View><EyeIcon blocked={reveal} /></View>
		</TouchableWithoutFeedback>
	</Frame>
}

export default function PasswordField(props) {
	return <Label {...props} component={FramedPasswordField} />
}

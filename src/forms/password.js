import React, { useState } from "react"
import { View, TextInput, TouchableWithoutFeedback } from "react-native"

import { Row } from "../layout"
import FormStyles from "../styles/forms"
import Label from "./label"
import Frame, { useFrameFocus } from "./frame"
import EyeIcon from "../../assets/svg/eye"
import CapsLockIcon from "../../assets/svg/caps-lock"
import { Metrics } from "../theme"
import { Platform } from "../platform"

function FramedPasswordField(props) {
	const { error, ...inputProps } = props
	const focused = useFrameFocus()
	const [reveal, setReveal] = useState(false)
	const [capsLockEnabled, setCapsLockEnabled] = useState(false)

	function toggleRevealPassword(e) {
		e.preventDefault()
		e.stopPropagation()
		setReveal(!reveal)
	}

	const keyUpHandler = (event) => {
		setCapsLockEnabled(event.getModifierState("CapsLock"))
	}

	return (
		<Frame as={Row} of="inside" focused={focused.value} error={error}>
			<TextInput
				{...inputProps}
				style={FormStyles.input_text}
				secureTextEntry={!reveal}
				{...focused.props}
				onKeyUp={Platform.web ? keyUpHandler : null}
			/>

			<View>{capsLockEnabled && <CapsLockIcon />}</View>

			<TouchableWithoutFeedback
				hitSlop={Metrics.hitSlop}
				onPress={toggleRevealPassword}
				accessibilityRole="button"
			>
				<View>
					<EyeIcon blocked={reveal} />
				</View>
			</TouchableWithoutFeedback>
		</Frame>
	)
}

export default function PasswordField(props) {
	return <Label {...props} component={FramedPasswordField} />
}

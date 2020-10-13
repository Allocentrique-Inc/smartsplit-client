import React, { useState } from "react"
import { View, TouchableWithoutFeedback } from "react-native"

import { Row } from "../layout"
import TextField from "./text"
import EyeIcon from "../svg/eye"
import CapsLockIcon from "../svg/caps-lock"
import { Metrics } from "../theme"
import { Platform } from "../platform"
import { observer } from "mobx-react"
const PasswordField = observer((props) => {
	//console.log(props)
	const { onKeyUp } = props
	const [reveal, setReveal] = useState(false)
	const [capsLockEnabled, setCapsLockEnabled] = useState(false)

	function toggleRevealPassword(e) {
		e.preventDefault()
		e.stopPropagation()
		setReveal(!reveal)
	}

	const keyUpHandler = (event, ...args) => {
		setCapsLockEnabled(event.getModifierState("CapsLock"))
		onKeyUp && onKeyUp(event, ...args)
	}

	return (
		<TextField
			{...props}
			layout={{ as: Row, of: "inside" }}
			secureTextEntry={!reveal}
			onKeyUp={Platform.web ? keyUpHandler : onKeyUp}
			after={
				<>
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
				</>
			}
		/>
	)
})
export default PasswordField

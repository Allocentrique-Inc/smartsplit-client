import { Platform, StyleSheet } from "react-native"
import { Metrics, Colors } from "../theme"

const FormStyles = StyleSheet.create({
	label_wrap: {
		margin: Metrics.spacing.components.tiny,
		flex: 1,
	},

	label: {
		flex: 1,
	},

	frame: {
		borderColor: Colors.stroke,
		borderRadius: Metrics.borderRadius.forms,
		borderWidth: 1,
		flexDirection: "row",
		alignItems: "center",
	},

	frame_focused: {
		borderColor: Colors.action,
	},

	input_text: {
		padding: Metrics.spacing.components.inside,
		flex: 1,
		height: Metrics.size.medium,
		...Platform.select({
			web: {
				outlineWidth: 0,
				minWidth: 0,
			}
		})
	},

	input_password_reveal: {
		margin: Metrics.spacing.components.inside,
	},
	
	undertext: {

	},
})

export default FormStyles

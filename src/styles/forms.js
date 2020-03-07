import { Platform, StyleSheet } from "react-native"
import { Metrics, Colors } from "../theme"

const FormStyles = StyleSheet.create({
	label_wrap: {
		flex: 1,
	},

	label: {
		flex: 1,
	},

	frame: {
		padding: Metrics.spacing.inside,
		height: Metrics.size.medium,
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
		flex: 1,
		...Platform.select({
			web: {
				outlineWidth: 0,
				minWidth: 0,
			}
		})
	},
	
	undertext: {

	},
})

export default FormStyles

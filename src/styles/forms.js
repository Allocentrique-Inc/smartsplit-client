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
	
	checkbox_svg: {
		minWidth: 24,
		minHeight: 24,
		flexBasis: 24,
	},
	
	select_menu: {
		borderBottomLeftRadius: Metrics.borderRadius.forms,
		borderBottomRightRadius: Metrics.borderRadius.forms,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: Colors.action,
		backgroundColor: Colors.background.ground,
	},
	
	select_item: {
		padding: Metrics.spacing.inside,
		borderColor: Colors.stroke,
		borderTopWidth: 1,
	},
	
	select_item_selected: {
		backgroundColor: Colors.background.underground,
	},
	
	select_scroll: {
		maxHeight: 200,
	},
})

export default FormStyles

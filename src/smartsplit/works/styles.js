import { StyleSheet } from "react-native"
import { Colors, Metrics }     from "../../theme"

export default StyleSheet.create({
	dashboard_row: {
		height: Metrics.size.xlarge,
		flexDirection: "row",
		alignItems: "center",
	},
	
	dashboard_row_cover: {
		margin: Metrics.spacing.component,
	},

	dashboard_row_title: {
		flex: 1,
	},

	dashboard_row_progress: {
		width: 300,
		marginRight: Metrics.spacing.group,
	},
	
	acrcloud_modal_checkboxes: {
		borderColor: Colors.background.underground,
		borderLeftWidth: 4,
		paddingLeft: 8
	},
})

import { StyleSheet } from "react-native"
import { Metrics, Colors } from "../../theme"

export default StyleSheet.create({
	cover: {
		width: Metrics.size.medium,
		height: Metrics.size.medium,
		backgroundColor: Colors.background.hell,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: Metrics.borderRadius.forms,
	},
})

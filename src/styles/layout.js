import { StyleSheet } from "react-native"
import { Colors } from "../theme"

export default StyleSheet.create({
	column: {
		flexDirection: "column",
	},
	
	row: {
		flexDirection: "row",
	},

	hairline: {
		alignSelf: "stretch",
		flex: 0,
		flexBasis: 1,
		backgroundColor: Colors.stroke,
		minWidth: 1,
		minHeight: 1,
	},

	flex: {
		flex: 1,
	},

	centerContent: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
})

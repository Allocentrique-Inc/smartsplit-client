import { StyleSheet } from "react-native"
import { Colors } from "../theme"

const LayoutStyles = StyleSheet.create({
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

	divider: {
		backgroundColor: Colors.stroke,
		height: 2,
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

LayoutStyles.justify = StyleSheet.create({
	left: {
		justifyContent: "flex-start",
	},

	center: {
		justifyContent: "center",
	},

	right: {
		justifyContent: "flex-end",
	},
})

LayoutStyles.align = StyleSheet.create({
	left: {
		alignItems: "flex-start",
	},

	center: {
		alignItems: "center",
	},

	stretch: {
		alignItems: "stretch",
	},

	right: {
		alignItems: "flex-end",
	},
})

export default LayoutStyles

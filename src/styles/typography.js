import { StyleSheet } from "react-native"
import { Typography, Colors } from "../theme"

function fontWithWeight(font, weight) {
	return (
		font +
		"-" +
		{
			400: "Regular",
			500: "Medium",
			700: "Bold",
		}[weight]
	)
}

const TypographyStyles = {
	text: {
		base: {
			fontFamily: fontWithWeight(Typography.font, Typography.Weight.normal),
			color: Colors.primary,
		},

		heavy: {
			fontFamily: fontWithWeight(Typography.font, Typography.Weight.heavy),
		},

		bold: {
			fontFamily: fontWithWeight(Typography.font, Typography.Weight.bold),
		},

		italic: {
			fontStyle: "italic",
		},

		reversed: {
			color: Colors.primary_reversed,
		},

		secondary: {
			color: Colors.secondary,
		},

		tertiary: {
			color: Colors.tertiary,
		},

		action: {
			color: Colors.action,
		},
		link: {
			color: Colors.action,
			fontWeight: Typography.Weight.bold,
		},
	},

	headings: {},
}

for (let [key, value] of Object.entries(Typography.text)) {
	TypographyStyles.text[key] = {
		fontSize: value.size,
		lineHeight: value.height,
	}
}

for (let [key, value] of Object.entries(Typography.titles)) {
	TypographyStyles.headings[key] = {
		fontSize: value.size,
		lineHeight: value.height,
		fontFamily: fontWithWeight(Typography.font, value.weight),
	}
}

TypographyStyles.text = StyleSheet.create(TypographyStyles.text)
TypographyStyles.headings = StyleSheet.create(TypographyStyles.headings)

export default TypographyStyles

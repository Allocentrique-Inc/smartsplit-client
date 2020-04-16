import { StyleSheet } from "react-native"
import { Typography, Colors } from "../theme"

function getFont(font, weight, italic = false) {
	return (
		font +
		"-" +
		{
			400: "Regular",
			500: "Medium",
			700: "Bold",
		}[weight] +
		(italic ? "Italic" : "")
	)
}

const TypographyStyles = {
	text: {
		base: {
			fontFamily: getFont(Typography.font, Typography.Weight.normal, false),
			color: Colors.primary,
		},

		regular_italic: {
			fontFamily: getFont(Typography.font, Typography.Weight.normal, true),
		},

		heavy: {
			fontFamily: getFont(Typography.font, Typography.Weight.heavy, false),
		},

		heavy_italic: {
			fontFamily: getFont(Typography.font, Typography.Weight.heavy, true),
		},

		bold: {
			fontFamily: getFont(Typography.font, Typography.Weight.bold, false),
		},

		bold_italic: {
			fontFamily: getFont(Typography.font, Typography.Weight.bold, true),
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

		error: {
			color: Colors.error,
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
		fontFamily: getFont(Typography.font, value.weight, false),
	}
}

TypographyStyles.text = StyleSheet.create(TypographyStyles.text)
TypographyStyles.headings = StyleSheet.create(TypographyStyles.headings)

export default TypographyStyles

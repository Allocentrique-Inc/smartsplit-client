import { StyleSheet } from "react-native"
import { Typography, Colors } from "../theme"

const TypographyStyles = {
	text: {
		base: {
			fontFamily: Typography.font,
			fontWeight: Typography.Weight.normal,
			color: Colors.primary,
		},
		
		bold: {
			fontWeight: Typography.Weight.bold,
		},
		reversed: {
			color: Colors.primary_reversed,
		},
	},
	
	headings: {}
}

for(let [key, value] of Object.entries(Typography.text)) {
	TypographyStyles.text[key] = {
		fontSize: value.size,
		lineHeight: value.height,
	}
}

for(let [key, value] of Object.entries(Typography.titles)) {
	TypographyStyles.headings[key] = {
		fontSize:   value.size,
		lineHeight: value.height,
		fontWeight: value.weight,
	}
}

TypographyStyles.text     = StyleSheet.create(TypographyStyles.text)
TypographyStyles.headings = StyleSheet.create(TypographyStyles.headings)

export default TypographyStyles

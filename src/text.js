import React from "react"
import { Text as TextView, TouchableWithoutFeedback } from "react-native"
import TypographyStyles from "./styles/typography"
import MetricsStyles from "./styles/metrics"

// Note: Il est important qu'il n'y ait pas d'espacement entre les tags, tel que
// <TextView>{props.children}</TextView>. Sinon l'espace est rendu, et il y a des
// espaces supplémentaires à l'affichage.

export function Text(props) {
	const {
		style,
		heavy,
		bold,
		italic,
		small,
		regular,
		reversed,
		secondary,
		tertiary,
		action,
		error,
		primary,
		link,
		...nextProps
	} = props

	const styles = [
		TypographyStyles.text.base,
		TypographyStyles.text[small ? "small" : "medium"],
	]

	function add(key) {
		styles.push(TypographyStyles.text[key])
	}

	if (bold) add(italic ? "bold_italic" : "bold")
	else if (heavy) add(italic ? "heavy_italic" : "heavy")
	else add(italic ? "regular_italic" : "regular")

	if (reversed) add("reversed")
	if (secondary) add("secondary")
	if (tertiary) add("tertiary")
	if (primary) add("primary")
	if (link) add("link")
	if (action) add("action")
	if (error) add("error")

	if (style) styles.push(style)

	return (
		<TextView style={styles} {...nextProps}>
			{props.children}
		</TextView>
	)
}

export function Link(props) {
	const { onClick, children, ...nextProps } = props

	return (
		<TouchableWithoutFeedback link onPress={props.onClick}>
			<Text {...nextProps}>{children}</Text>
		</TouchableWithoutFeedback>
	)
}

export function Heading(props) {
	const level = props.level || 1

	return (
		<TextView
			style={[
				TypographyStyles.text.base,
				TypographyStyles.headings[level],
				props.style,
			]}
		>
			{props.children}
		</TextView>
	)
}

export function Paragraph(props) {
	return (
		<TextView style={[TypographyStyles.text.base]}>{props.children}</TextView>
	)
}

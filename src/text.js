import React from "react"
import { Text as TextView } from "react-native"
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
		primary,
		link,
		...nextProps
	} = props

	const styles = [
		TypographyStyles.text.base,
		TypographyStyles.text[small ? "small" : "medium"],
	]

	if (heavy) styles.push(TypographyStyles.text.heavy)

	if (bold) styles.push(TypographyStyles.text.bold)

	if (italic) styles.push(TypographyStyles.text.italic)

	if (reversed) styles.push(TypographyStyles.text.reversed)

	if (secondary) styles.push(TypographyStyles.text.secondary)

	if (tertiary) styles.push(TypographyStyles.text.tertiary)

	if (action) styles.push(TypographyStyles.text.action)

	if (primary) styles.push(TypographyStyles.text.primary)

	if (regular) styles.push(TypographyStyles.text.regular)

	if (link) styles.push(TypographyStyles.text.link)

	if (style) styles.push(style)

	return (
		<TextView style={styles} {...nextProps}>
			{props.children}
		</TextView>
	)
}

export function Heading(props) {
	const level = props.level || 1

	return (
		<TextView
			style={[TypographyStyles.text.base, TypographyStyles.headings[level]]}
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

import React from "react"
import { Text as TextView } from "react-native"
import TypographyStyles     from "./styles/typography"
import MetricsStyles        from "./styles/metrics"

// Note: Il est important qu'il n'y ait pas d'espacement entre les tags, tel que
// <TextView>{props.children}</TextView>. Sinon l'espace est rendu, et il y a des
// espaces supplémentaires à l'affichage.

export function Text(props) {
	const {
		style,
		heavy,
		bold,
		small,
		reversed,
		secondary,
		...nextProps
	} = props
	
	const styles = [
		TypographyStyles.text.base,
		TypographyStyles.text[small ? "small" : "medium"],
		style
	]
	
	if(heavy)
		styles.push(TypographyStyles.text.heavy)
	
	if(bold)
		styles.push(TypographyStyles.text.bold)
	
	if(reversed)
		styles.push(TypographyStyles.text.reversed)
	
	if(secondary)
		styles.push(TypographyStyles.text.secondary)
	
	return <TextView style={styles} {...nextProps}>{props.children}</TextView>
}

export function Heading(props) {
	const level = props.level || 1
	
	return <TextView style={[
		TypographyStyles.text.base,
		TypographyStyles.headings[level]
	]}>{props.children}</TextView>
}

export function Paragraph(props) {
	return <TextView style={[
		TypographyStyles.text.base
	]}>{props.children}</TextView>
}

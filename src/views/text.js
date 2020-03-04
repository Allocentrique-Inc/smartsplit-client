import React from "react"
import { Text as TextView } from "react-native"
import TypographyStyles from "../styles/typography"
import MetricsStyles from "../styles/metrics"

// Note: Il est important qu'il n'y ait pas d'espacement entre les tags, tel que
// <TextView>{props.children}</TextView>. Sinon l'espace est rendu, et il y a des
// espaces supplémentaires à l'affichage.

export function Text(props) {
	const { style, ...nextProps } = props
	
	const styles = [
		TypographyStyles.text.base,
		TypographyStyles.text[props.small ? "small" : "medium"],
		MetricsStyles.components[props.inside ? "tiny" : "inside"],
		style
	]
	
	if(props.bold)
		styles.push(TypographyStyles.text.bold)
	
	if(props.reversed)
		styles.push(TypographyStyles.text.reversed)
	
	return <TextView style={styles} {...nextProps}>{props.children}</TextView>
}

export function Heading(props) {
	const level = props.level || 1
	
	return <TextView style={[
		TypographyStyles.text.base,
		MetricsStyles.components.small,
		TypographyStyles.headings[level]
	]}>{props.children}</TextView>
}

export function Paragraph(props) {
	return <TextView style={[
		MetricsStyles.components.small,
		TypographyStyles.text.base
	]}>{props.children}</TextView>
}

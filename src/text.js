import React from "react"
import { Text as TextView, TouchableWithoutFeedback } from "react-native"
import { mapChildren, mapFragmentChildren } from "./utils/react"
import TypographyStyles from "./styles/typography"
import MetricsStyles from "./styles/metrics"

export function Text(props) {
	const {
		style,
		heavy,
		bold,
		italic,
		small,
		tiny,
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
		TypographyStyles.text[tiny ? "tiny" : small ? "small" : "medium"],
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

	function extendText(child, xprops) {
		return React.createElement(
			Text,
			{ ...props, ...child.props, numberOfLines: undefined, ...xprops },
			child.props.children
		)
	}

	function formatChild(child) {
		if (typeof child === "function") {
			return React.createElement(
				React.Fragment,
				{},
				formatChild(mapFragmentChildren(child(), formatChild))
			)
		}

		let xprops = null

		switch (typeof child === "object" && child.type) {
			case Text:
				return extendText(child, {})

			case React.Fragment:
				return mapFragmentChildren(child, formatChild)

			case "b":
			case "bold":
				return extendText(child, { bold: !bold })

			case "heavy":
				return extendText(child, { heavy: !heavy })

			case "i":
			case "italic":
				return extendText(child, { italic: !italic })

			case "small":
				return extendText(child, { small: true, medium: false })

			case "medium":
				return extendText(child, { small: false, medium: true })

			case "primary":
			case "secondary":
			case "tertiary":
			case "reversed":
				xprops = {
					primary: false,
					secondary: false,
					tertiary: false,
					reversed: false,
				}

				xprops[child.type] = true
				return extendText(child, xprops)

			case "link":
				return (
					<Link {...props} {...child.props}>
						{child.props.children}
					</Link>
				)

			case "action":
			case "error":
				xprops = {
					link: false,
					action: false,
					error: false,
				}

				xprops[child.type] = true
				return extendText(child, xprops)

			default:
				if (Array.isArray(child)) {
					return child.map(formatChild)
				} else {
					return child
				}
		}
	}

	return React.createElement(
		TextView,
		{ style: styles, ...nextProps },
		...mapChildren(props.children, formatChild)
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
		<TextView
			style={[
				TypographyStyles.text.base,
				TypographyStyles.text.medium,
				props.style,
			]}
		>
			{props.children}
		</TextView>
	)
}

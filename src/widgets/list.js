import React, { useState } from "react"
import {
	LayoutAnimation,
	Platform,
	StyleSheet,
	UIManager,
	TouchableWithoutFeedback,
	View,
} from "react-native"
import { Column, Row } from "../layout"
import { Colors, Metrics } from "../theme"
import { Text } from "../text"

const ListStyle = StyleSheet.create({
	list_container: {
		flex: 1,
	},
	item_frame: {
		...Platform.select({
			web: { boxShadow: `inset 0px 1px 0px ${Colors.stroke}` },
			default: {
				borderTopWidth: 1,
				borderTopColor: Colors.stroke,
				borderStyle: "solid",
			},
		}),
		paddingTop: Metrics.spacing.component,
		paddingRight: Metrics.spacing.component,
		paddingBottom: Metrics.spacing.component,
		paddingLeft: Metrics.spacing.component,
	},
	empty_frame: {
		...Platform.select({
			web: { boxShadow: `inset 0px 1px 0px ${Colors.stroke}` },
			default: {
				borderTopWidth: 1,
				borderTopColor: Colors.stroke,
				borderStyle: "solid",
			},
		}),
		paddingTop: 0,
		paddingRight: 0,
		paddingBottom: 0,
		paddingLeft: 0,
		flex: 1,
	},
	list_head: {
		paddingTop: Metrics.spacing.component,
		paddingRight: Metrics.spacing.component,
		paddingBottom: Metrics.spacing.component,
		paddingLeft: 0,
	},
})

const DefaultAnimationConfig = {
	duration: 300,
	create: {
		type: "linear",
		property: "opacity",
		duration: 150,
		delay: 100,
	},
	update: {
		type: "linear",
	},
	delete: {
		type: "linear",
		property: "opacity",
		duration: 80,
	},
}

export default function List(props) {
	const { title, children, headStyle, style } = props
	return (
		<Column style={[ListStyle.list_container, style]}>
			{title && (
				<Column key={-1} style={[ListStyle.list_head, headStyle]}>
					{typeof title === "string" ? (
						<Text bold>{title}</Text>
					) : (
						<View>{title}</View>
					)}
				</Column>
			)}
			{children}
		</Column>
	)
}

export function ListItem(props) {
	const { children, style, list, ...nextProps } = props
	return (
		<Row
			of="component"
			style={[list ? ListStyle.empty_frame : ListStyle.item_frame, style]}
			{...nextProps}
		>
			{typeof children === "string" ? <Text>{children}</Text> : children}
		</Row>
	)
}

export function CollapsableList(props) {
	const {
		title,
		children,
		icon,
		animate,
		headStyle,
		onMouseEnterTitle,
		onMouseLeaveTitle,
		onPressTitle,
		...nextProps
	} = props

	const onExpand = !!nextProps.onExpand ? nextProps.onExpand : () => {}
	const animationConfig = !!nextProps.animationConfig
		? nextProps.animationConfig
		: DefaultAnimationConfig
	if (
		Platform.OS === "android" &&
		UIManager.setLayoutAnimationEnabledExperimental
	) {
		UIManager.setLayoutAnimationEnabledExperimental(true)
	}
	let expanded, setExpanded
	if (!!nextProps.expanded) {
		expanded = nextProps.expanded
		setExpanded = nextProps.onExpand
	} else {
		;[expanded, setExpanded] = useState(false)
	}

	function handlePress() {
		if (!!animate) {
			LayoutAnimation.configureNext(animationConfig)
		}
		onExpand(!expanded)
		setExpanded(!expanded)
		onPressTitle()
	}

	return (
		<Row style={{ flex: 1 }}>
			{icon && (
				<TouchableWithoutFeedback onPress={handlePress}>
					<Column padding="medium">
						<View>{icon}</View>
					</Column>
				</TouchableWithoutFeedback>
			)}
			<Column style={ListStyle.list_container}>
				<TouchableWithoutFeedback
					onPress={handlePress}
					onMouseEnter={onMouseEnterTitle}
					onMouseLeave={onMouseLeaveTitle}
				>
					<Column key={-1} style={[ListStyle.list_head, headStyle]}>
						{typeof title === "string" ? (
							<Text bold>{title}</Text>
						) : (
							<View>{title}</View>
						)}
					</Column>
				</TouchableWithoutFeedback>
				{expanded && children}
			</Column>
		</Row>
	)
}

import React, { useState, useEffect, useRef, useCallback } from "react"
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	findNodeHandle,
} from "react-native"
import { useRouteMatch, useHistory } from "react-router"
import { Platform } from "../platform"
import { Row, Column } from "../layout"
import { Colors, Metrics } from "../theme"
import { Text } from "../text"
import { forEachChildren } from "../utils/react"

export default function MultisectionLayout({ children }) {
	const menuItems = []
	const bodyItems = []

	forEachChildren(children, function (child) {
		menuItems.push(
			<MenuItem
				key={child.props.url}
				url={child.props.url}
				title={child.props.title}
			/>
		)

		bodyItems.push(
			<BodySection key={child.props.url} url={child.props.url}>
				{child}
			</BodySection>
		)
	})

	return (
		<Row flex={1}>
			<Column style={Styles.menuPanel}>{menuItems}</Column>

			<Column of="none" spacer={Spacer} flex={1}>
				{bodyItems}
			</Column>
		</Row>
	)
}

export function MenuItem({ url, title }) {
	const isActive = useRouteMatch(url)
	const history = useHistory()

	function navigate() {
		history.replace(url)
	}

	return (
		<TouchableWithoutFeedback onPress={navigate}>
			<View style={[Styles.menuItem, isActive && Styles.menuItemActive]}>
				<Text heavy secondary={!isActive}>
					{title}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}

export function BodySection({ url, children }) {
	if (!Platform.web) {
		return children
	}

	const isActive = useRouteMatch(url)
	const history = useHistory()
	const domNode = useRef()
	const [inside, setInside] = useState(false)

	const onEnter = useCallback(() => {
		setInside(true)
		history.replace(url)
	})

	const onLeave = useCallback(() => {
		setInside(false)
	})

	useEffect(() => {
		if (inside || !isActive || !domNode.current) return
		const node = findNodeHandle(domNode.current)
		if (node) node.scrollIntoView({ behavior: "smooth", block: "center" })
	}, [!!isActive])

	return (
		<View ref={domNode} onMouseEnter={onEnter} onMouseLeave={onLeave}>
			{children}
		</View>
	)
}

function Spacer() {
	return <View style={Styles.spacer} />
}

export const Styles = StyleSheet.create({
	spacer: {
		marginTop: Metrics.spacing.section,
		marginBottom: Metrics.spacing.section,
		height: 1,
		backgroundColor: Colors.stroke,
	},

	menuPanel: {
		width: 224,
		marginRight: 96,
		position: "sticky",
		top: Metrics.spacing.section,
		alignSelf: "flex-start",
	},

	menuItem: {
		borderLeftColor: "transparent",
		borderLeftWidth: 4,
		paddingLeft: Metrics.spacing.component,
		paddingRight: Metrics.spacing.component,
		paddingTop: Metrics.spacing.inside,
		paddingBottom: Metrics.spacing.inside,
		minHeight: Metrics.size.medium,
	},

	menuItemActive: {
		borderLeftColor: Colors.action,
		backgroundColor: Colors.background.underground,
	},
})

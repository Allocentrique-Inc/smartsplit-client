import React from "react"
import {
	Platform,
	View,
	StyleSheet,
	TouchableWithoutFeedback,
} from "react-native"
import { Row, Column, Flex } from "../layout"
import { useRouteMatch, useHistory } from "react-router"
import { Colors, Metrics } from "../theme"

export const Styles = StyleSheet.create({
	menubar: {
		alignSelf: "stretch",
		justifyContent: "space-evenly",
		alignItems: "center",
		borderTopWidth: 1,
		borderTopColor: Colors.stroke,
		height: Metrics.size.large,
		...Platform.select({
			web: {
				boxShadow: "0px 10px 10px 10px #888888",
			},
		}),
	},
})

export default function BottomNavbarLayout({ menuItems, children }) {
	const items = menuItems.map((item) => <MenuItem key={item.to} {...item} />)

	return (
		<Column flex={1}>
			{children}
			<Row style={Styles.menubar}>{items}</Row>
		</Column>
	)
}

export function MenuItem(props) {
	const Icon = props.icon
	const active = useRouteMatch(props.to)
	const history = useHistory()

	function activate() {
		history.push(props.to)
	}

	return (
		<TouchableWithoutFeedback onPress={activate} accessibilityRole="button">
			<View>
				<Icon color={active ? Colors.action : Colors.inactive} />
			</View>
		</TouchableWithoutFeedback>
	)
}

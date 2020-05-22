import React, { useState } from "react"
import {
	CollapsableItem,
	CollapsableList,
} from "../../widgets/collapsable-list"
import { forEachChildren, Row } from "../../layout"
import ChevronDown from "../../svg/chevron-down"
import ChevronRight from "../../svg/chevron-right"
import Bullet from "../../../assets/svg/dot.svg"
import { StyleSheet } from "react-native"
import { Text } from "../../text"
import { Colors } from "../../theme"
import { TouchableWithoutFeedback, View } from "react-native"
import { Platform } from "../../platform"
import Hourglass from "../../svg/hourglass"
import { AdminListMenu, DefaultMenu, PendingMenu } from "./admin-list-menus"

export const AdminListStyle = StyleSheet.create({
	menu_container: {
		flex: 1,
		justifyContent: "flex-end",
	},
	frame_pending: {
		backgroundColor: Colors.background.underground,
	},
})

function getTitle(children) {
	let title
	if (typeof children === "object") {
		title = []
		if (Array.isArray(children)) {
			title = children.map((element, index) =>
				React.cloneElement(element, { key: index })
			)
		} else {
			forEachChildren(children, (child, index) =>
				title.push(React.cloneElement(child, { key: index }))
			)
		}
	} else if (typeof children === "string") {
		title = <Text>{children}</Text>
	} else {
		title = children
	}
	return title
}

export function AdminListItem(props) {
	const {
		children,
		pending,
		onDelete,
		onModify,
		onAdd,
		onAccept,
		onRefuse,
		focus,
		hideBullet,
		list,
		...nextProps
	} = props
	const content = getTitle(nextProps.content)

	function renderMenu() {
		return (
			<>
				{children && (
					<AdminListMenu disabled={!focus}>{children}</AdminListMenu>
				)}
				{!children &&
					(pending ? (
						<PendingMenu
							disabled={!focus}
							onAccept={onAccept}
							onRefuse={onRefuse}
							onModify={onModify}
						/>
					) : (
						<DefaultMenu
							disabled={!focus}
							onAdd={onAdd}
							onDelete={onDelete}
							onModify={onModify}
						/>
					))}
			</>
		)
	}

	return (
		<CollapsableItem
			list={list}
			{...nextProps}
			style={pending ? AdminListStyle.frame_pending : null}
		>
			{list && content}
			{!list && (
				<>
					<Row of="component" valign="center">
						{!hideBullet &&
							(pending ? (
								<Hourglass color={Colors.alert_warning} />
							) : (
								<Bullet />
							))}
						{content}
					</Row>
					{!list && renderMenu()}
				</>
			)}
		</CollapsableItem>
	)
}

export function AdminList(props) {
	const { children, ...nextProps } = props
	const title = getTitle(nextProps.title)
	const [currentFocus, setCurrentFocus] = useState(null)
	let newChildren = []
	forEachChildren(children, (child, index) => {
		newChildren.push(
			Platform.web ? (
				React.cloneElement(child, {
					focus: index === currentFocus,
					onMouseEnter: () => setCurrentFocus(index),
					onMouseLeave: () => setCurrentFocus(null),
				})
			) : (
				<TouchableWithoutFeedback
					onPress={() => setCurrentFocus(index !== currentFocus ? index : null)}
					key={index}
				>
					{React.cloneElement(child, { focus: index === currentFocus })}
				</TouchableWithoutFeedback>
			)
		)
	})
	const [expanded, setExpanded] = useState(false)

	function handleExpand(expanded) {
		setExpanded(expanded)
		if (!expanded && !!currentFocus) {
			setCurrentFocus(null)
		}
	}

	function renderTitle() {
		return (
			<Row align="spread">
				{title}
				<DefaultMenu disabled={currentFocus !== -1} />
			</Row>
		)
	}

	return (
		<CollapsableList
			title={renderTitle()}
			onExpand={(value) => handleExpand(value)}
			expanded={expanded}
			icon={expanded ? <ChevronDown/> : <ChevronRight/> }
			onMouseEnterTitle={() => setCurrentFocus(-1)}
			onMouseLeaveTitle={() => setCurrentFocus(null)}
			onPressTitle={() => setCurrentFocus((expanded && currentFocus !== -1) ? null : -1)}
			animate
		>
			{newChildren}
		</CollapsableList>
	)
}

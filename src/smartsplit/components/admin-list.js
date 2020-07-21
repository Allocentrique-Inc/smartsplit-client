import React, { useState } from "react"
import List, { ListItem, CollapsableList } from "../../widgets/list"
import { Row } from "../../layout"
import ChevronDown from "../../svg/chevron-down"
import ChevronRight from "../../svg/chevron-right"
import Bullet from "../../../assets/svg/dot.svg"
import { StyleSheet } from "react-native"
import { Text } from "../../text"
import { Colors } from "../../theme"
import { TouchableWithoutFeedback, View } from "react-native"
import { Platform } from "../../platform"
import Hourglass from "../../svg/hourglass"
import {
	AdminListMenu,
	DefaultMenu,
	PendingMenu,
	SimpleMenu,
} from "./admin-list-menus"
import UUID from "uuidjs"
import { forEachChildren } from "../../utils/react"
import { useFocusGroup } from "../../utils/hooks"

export const AdminListStyle = StyleSheet.create({
	frame_pending: {
		backgroundColor: Colors.background.underground,
	},
})

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
		contentIsList,
		contextualMenu,
		...nextProps
	} = props
	const content =
		typeof nextProps.content === "string" ? (
			<Text>{nextProps.content}</Text>
		) : (
			nextProps.content
		)

	function renderMenu() {
		const menuProps = {
			disabled: !focus,
			onAdd: onAdd,
			onDelete: onDelete,
			onModify: onModify,
		}
		let menu = <DefaultMenu {...menuProps} />
		if (contextualMenu === "simple") {
			menu = <SimpleMenu {...menuProps} />
		} else if (pending) {
			menu = <PendingMenu {...menuProps} />
		} else if (typeof contextualMenu === "object" && !!contextualMenu) {
			let menuChildren = []
			forEachChildren(contextualMenu, (child) =>
				menuChildren.push(React.cloneElement(child, { disabled: !focus }))
			)
			menu = <AdminListMenu disabled={!focus}>{menuChildren}</AdminListMenu>
		}

		return menu
	}

	return (
		<ListItem
			contentIsList={contentIsList}
			{...nextProps}
			style={pending ? AdminListStyle.frame_pending : null}
		>
			{contentIsList && content}
			{!contentIsList && (
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
					{renderMenu()}
				</>
			)}
		</ListItem>
	)
}

export function AdminList(props) {
	const { children, collapsable, ...nextProps } = props
	const title =
		typeof nextProps.title === "string" ? <Text>{title}</Text> : nextProps.title
	const [newChildren, currentFocus, setCurrentFocus] = useFocusGroup(children)
	const listHeadId = useState(UUID.generate())[0]

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
				<DefaultMenu disabled={currentFocus !== listHeadId} />
			</Row>
		)
	}

	return collapsable ? (
		<CollapsableList
			title={title && renderTitle()}
			onExpand={(value) => handleExpand(value)}
			expanded={expanded}
			icon={expanded ? <ChevronDown /> : <ChevronRight />}
			onMouseEnterTitle={() => setCurrentFocus(listHeadId)}
			onMouseLeaveTitle={() => setCurrentFocus(null)}
			onPressTitle={() =>
				setCurrentFocus(
					expanded && currentFocus !== listHeadId ? null : listHeadId
				)
			}
			animate
		>
			{Array.from(newChildren.values())}
		</CollapsableList>
	) : (
		<List title={title && renderTitle()}>
			{Array.from(newChildren.values())}
		</List>	)
}

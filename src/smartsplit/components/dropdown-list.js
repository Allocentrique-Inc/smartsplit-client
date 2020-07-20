import React from "react"
import { Column, Row } from "../../layout"
import { Text } from "../../text"

export default function DropdownList(props) {
	const {
		icon,
		title,
		role,
		roleDefinition,
		duration,
		remove,
		renew,
		onChange,
	} = props

	return (
		<Row of="component" flex={1}>
			{icon && <Column>{icon}</Column>}
			<Text tertiary>{title}</Text>
			<Column flex={1}>
				<Text>{role}</Text>
				<Text secondary small>
					{roleDefinition}
				</Text>
				<Text>{duration}</Text>
				<Text secondary small>
					{renew}
				</Text>
				<Text>{remove}</Text>
			</Column>
		</Row>
	)
}

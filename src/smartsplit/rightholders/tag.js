import React from "react"
import UserAvatar from "../user/avatar"
import { Text } from "../../text"
import { Row } from "../../layout"
import XIcon from "../../../assets/svg/x"

export default function RightHolderTag(props) {
	const { name, initials, style, ...nextProps } = props

	return (
		<Row
			of="inside"
			padding="inside"
			layer="underground"
			style={[{ alignItems: "center" }, style]}
			{...nextProps}
		>
			<UserAvatar size="small" initials={initials} />
			<Text>{name}</Text>
			<XIcon size="xsmall" />
		</Row>
	)
}

import React from "react"
import { useTranslation } from "react-i18next"
import { Row, Flex } from "../../../layout"
import LogoSmartSplit from "../../../svg/logo-smartsplit"
import UserAvatar from "../../../smartsplit/user/avatar"
import ChevronDown from "../../../svg/chevron-down"

export function SheetNavbar(props) {
	return (
		<Row
			valign="center"
			layer="underground"
			of="group"
			padding="component"
			style={{ alignItems: "center" }}
		>
			<LogoSmartSplit />
			<Flex />
			<Row of="inside" valign="center">
				<UserAvatar size="small" />
				<ChevronDown />
			</Row>
		</Row>
	)
}

export function SheetHeader(props) {
	const { rightHolder, AlbumTitle, workpiece, workType } = props
	return <></>
}
export default function WorkpieceSheetLayout() {
	return <></>
}

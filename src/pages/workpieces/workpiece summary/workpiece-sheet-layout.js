import React from "react"
import { useTranslation } from "react-i18next"
import LogoSmartSplit from "../../svg/logo-smartsplit"

export function SheetNavbar(props) {
	return (
		<Row of="group" padding="group" style={{ alignItems: "center" }}>
			<LogoSmartSplit />
			<Flex />
			{props.children}
		</Row>
	)
}
export default function WorkpieceSheetLayout() {
	return <></>
}

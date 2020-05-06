import React from "react"
import LogoSmartSplit from "../../../assets/svg/logo-smartsplit"
import { Flex, Row } from "../../layout"
import { useTranslation } from "react-i18next"

export default function PublicNavBarWeb(props) {
	const [t] = useTranslation()
	return (
		<Row of="group" padding="group" style={{ alignItems: "center" }}>
			<LogoSmartSplit />
			<Flex />
			{props.children}
		</Row>
	)
}

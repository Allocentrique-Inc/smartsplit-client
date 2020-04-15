import React from "react"
import ArrowLeft from "../../svg/arrow-left"
import { Flex, Row } from "../../layout"
import { Heading, Text } from "../../text"
import Button from "../../widgets/button"

export default function NavBarMobile(props) {
	return (
		<Row of="group" padding="group" style={{ alignItems: "stretch" }}>
			<ArrowLeft />
			<Heading level="4">Profil publique</Heading>
			<Button tertiary text="Sauvegarder" />
		</Row>
	)
}

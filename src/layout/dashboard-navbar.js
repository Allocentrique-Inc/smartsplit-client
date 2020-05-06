import React from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import { View, BackHandler } from "react-native"
import { Platform } from "../platform"
import { Flex, Row, Hairline, Column, Group, Spacer } from "../layout"
import { Heading } from "../text"
import Button from "../widgets/button"
import ArrowLeft from "../svg/arrow-left"
import UserAvatar from "../smartsplit/user/avatar"

export default function DashboardNavbar(props) {
	const { header } = props
	const [t] = useTranslation()
	const history = useHistory()
	const goBack = () => history.push("/dashboard")
	return (
		<>
			{Platform.web && (
				<>
					<Row
						of="group"
						size="xlarge"
						style={{
							alignItems: "center",
							maxWidth: 624,
						}}
					>
						<View style={{ width: 223 }}>
							<ArrowLeft onBack={goBack} />
						</View>
						<UserAvatar initials="XX" size="medium" />
						<Heading level="5">{header}</Heading>
						<Flex />
					</Row>
					<Hairline />
					<Spacer of="group" />
				</>
			)}

			{Platform.native && (
				<>
					<Row
						of="component"
						style={{
							alignItems: "center",

							maxWidth: 375,
						}}
					>
						<ArrowLeft onBack={(onBack = { goBack })} />
						<Heading level="4">{header}</Heading>
						<Flex />
						<Button tertiary text={t("general:buttons.save")} />
					</Row>

					<Hairline />
					<Spacer of="group" />
				</>
			)}
		</>
	)
}

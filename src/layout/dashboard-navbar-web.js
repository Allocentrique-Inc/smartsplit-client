import React from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { Flex, Row, Hairline } from "../layout"
import { Heading } from "../text"
import ArrowLeft from "../../assets/svg/arrow-left"
import UserAvatar from "../smartsplit/user/avatar"

export default function DashboardNavbarWeb(props) {
	const [t] = useTranslation()
	return (
		<>
			<Row
				of="component"
				padding="component"
				size="xlarge"
				style={{
					alignItems: "center",
					maxWidth: "944dp",
					alignSelf: "left",
				}}
			>
				<View style={{ width: 223 }}>
					<ArrowLeft />
				</View>
				<UserAvatar initials="XX" size="medium" />
				<Heading level="5">{props.header}</Heading>
				<Flex />
			</Row>
			<Hairline />
		</>
	)
}

import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Platform, View } from "react-native"
import { Group, Hairline, Flex, Row, Column } from "../../../layout"
import { Heading, Paragraph, Text } from "../../../text"
import { Colors } from "../../../theme"
import { TextField, Dropdown } from "../../../forms"
import Button from "../../../widgets/button"
import ChangePasswordModal from "../ChangePasswordContainer"
import DashboardNavBarWeb from "../../../layout/dashboard-navbar-web"
import DashboardNavbarNative from "../../../layout/dashboard-navbar-native"

export default function MySecurity() {
	const [t] = useTranslation()

	const [changePasswordModalOpened, setChangePasswordModalOpened] = useState(
		false
	)
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const [checkBox, setCheckBox] = useState(false)

	return (
		<>
			<Row of="component">
				<Flex>
					<Heading level="2">{t("titles:security")}</Heading>
				</Flex>
			</Row>

			<Hairline />

			<Heading level="4">{t("titles:password")}</Heading>

			<Row of="component">
				<Button
					secondary
					text={t("general:buttons.passwordChange")}
					onClick={() => {
						setChangePasswordModalOpened(true)
					}}
					size={buttonSize}
					style={
						({ borderColor: Colors.stroke },
						Platform.OS === "web" ? { flex: 0.5 } : { flex: 1 })
					}
				/>
				{Platform.OS === "web" && <Flex />}
			</Row>

			{changePasswordModalOpened && (
				<ChangePasswordModal
					onRequestClose={() => setChangePasswordModalOpened(false)}
				/>
			)}

			<Heading level="4">{t("titles:password")}</Heading>
			<Row of="component">
				<Button
					error
					text={t("general:buttons.deleteAccount")}
					size={buttonSize}
					style={
						({ borderColor: Colors.stroke },
						Platform.OS === "web" ? { flex: 0.5 } : { flex: 1 })
					}
				/>
				{Platform.OS === "web" && <Flex />}
			</Row>

			<Heading level="4">{t("general:auth")}</Heading>
		</>
	)
}

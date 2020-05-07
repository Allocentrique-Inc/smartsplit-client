import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { Platform } from "../../../platform"
import { Group, Hairline, Flex, Row, Column } from "../../../layout"
import { Heading, Paragraph, Text } from "../../../text"
import { Colors } from "../../../theme"
import { TextField, Dropdown } from "../../../forms"
import Button from "../../../widgets/button"
import ChangePasswordModal from "../ChangePasswordContainer"
import DeleteAccountModal from "../delete-account"
import DashboardNavbarNative from "../../../layout/subscreen"
import Label from "../../../forms/label"

export default function MySecurity() {
	const [t] = useTranslation()

	const [changePasswordModalOpened, setChangePasswordModalOpened] = useState(
		false
	)

	const [deleteAccountModalOpened, setDeleteAccountModalOpened] = useState(
		false
	)

	return (
		<Column of="group">
			{Platform.web && <Heading level="2">{t("settings:security")}</Heading>}
			<Label label={t("settings:password")}>
				<Button secondary bold text={t("general:buttons.passwordChange")}/>
			</Label>
			<Label label={t("settings:delete")}>
				<Button danger text={t("general:buttons.deleteAccount")}/>
			</Label>

		</Column>
		// <Platform web={Group} of="group" native={Column} of="component">
		// 	{Platform.native && (
		// 		<DashboardNavbarNative header={t("settings:account")} />
		// 	)}
		//
		// 	<Heading level="4">{t("settings:password")}</Heading>
		//
		// 	<Row of="component">
		// 		<Button
		// 			secondary
		// 			style={
		// 				({ borderColor: Colors.stroke },
		// 				Platform.OS === "web" ? { flex: 0.5 } : { flex: 1 })
		// 			}
		// 			onClick={() => {
		// 				setChangePasswordModalOpened(true)
		// 			}}
		// 		/>
		//
		// 		{Platform.OS === "web" && <Flex />}
		// 	</Row>
		//
		// 	{changePasswordModalOpened && (

		// 	)}
		//
		// 	<Heading level="4">{t("settings:delete")}</Heading>
		// 	<Row of="component">
		// 		<Button
		// 			error
		// 			text={t("general:buttons.deleteAccount")}
		// 			style={
		// 				({ borderColor: Colors.stroke },
		// 				Platform.OS === "web" ? { flex: 0.5 } : { flex: 1 })
		// 			}
		// 			onClick={() => {
		// 				setDeleteAccountModalOpened(true)
		// 			}}
		// 		/>
		// 		{Platform.OS === "web" && <Flex />}
		// 	</Row>
		//
		// 	{deleteAccountModalOpened && (
		// 		<DeleteAccountModal
		// 			visible={deleteAccountModalOpened}
		// 			onRequestClose={() => setDeleteAccountModalOpened(false)}
		// 		/>
		// 	)}
		//
		// 	<Heading level="4">{t("general:auth")}</Heading>
		// </Platform>
	)
}

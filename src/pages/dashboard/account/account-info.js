import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, View } from "react-native"
import { Platform } from "../../../platform"
import { Group, Hairline, Flex, Row, Column } from "../../../layout"
import { Heading, Paragraph, Text } from "../../../text"
import { Colors } from "../../../theme"
import { TextField, Dropdown, CheckBox } from "../../../forms"
import Button from "../../../widgets/button"
import ChangePasswordModal from "../ChangePasswordContainer"
import DashboardNavBarWeb from "../../../layout/dashboard-navbar-web"
import DashboardNavbarNative from "../../../layout/dashboard-navbar-native"
import CheckMark from "../../../svg/check-mark"

export default function AccountInfo() {
	const [t] = useTranslation()

	const [changePasswordModalOpened, setChangePasswordModalOpened] = useState(
		false
	)
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const [checkBox, setCheckBox] = useState(false)

	return (
		<>
			{Platform.OS === "web" && (
				<>
					<Row of="component">
						<Flex>
							<Heading level="2">{t("dashboardTitles:account")}</Heading>
						</Flex>
					</Row>
				</>
			)}

			<TextField label={t("forms:labels.civicAddress")} placeholder="" />

			<Row of="component">
				<Dropdown
					label={t("forms:labels.dropdowns.language")}
					placeholder=""
					noFocusToggle
				/>
				{Platform.web && <Flex />}
			</Row>

			<Heading level="5">{t("forms:labels.dropdowns.phone")}</Heading>

			<Platform web={Row} native={Column} of="component">
				<Dropdown
					placeholder=""
					noFocusToggle
					style={Platform.web ? { flex: 2.5 } : { flex: 1 }}
				/>

				<Button
					secondary
					text={
						<Text link bold>
							{t("general:buttons.validNo")}
						</Text>
					}
					size={buttonSize}
					style={({ borderColor: Colors.stroke }, Platform.web && { flex: 1 })}
				/>

				{Platform.web && <Flex />}
			</Platform>

			<Heading level="5">{t("dashboardTitles:associateEmails")}</Heading>
			<Paragraph>{t("dashboardTitles:subTitles.documentEmails")}</Paragraph>

			<Row of="component">
				<Button
					secondary
					text={
						<Text link bold>
							{t("general:buttons.addEmail")}
						</Text>
					}
					size={buttonSize}
					style={
						({ borderColor: Colors.stroke },
						Platform.OS === "web" ? { flex: 0.5 } : { flex: 1 })
					}
				/>
				{Platform.OS === "web" && <Flex />}
			</Row>

			{Platform.OS === "web" && <Hairline />}
		</>
	)
}

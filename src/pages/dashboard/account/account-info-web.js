import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, View, TouchableWithoutFeedback } from "react-native"
import { Platform } from "../../../platform"
import { Group, Hairline, Flex, Row, Column } from "../../../layout"
import { Heading, Paragraph, Text } from "../../../text"
import { Colors } from "../../../theme"
import { TextField, Dropdown, CheckBox } from "../../../forms"
import { TabBar, Tab } from "../../../widgets/tabs"
import Button from "../../../widgets/button"
import ChangePasswordModal from "../ChangePasswordContainer"
import DashboardNavBarWeb from "../../../layout/dashboard-navbar-web"
import MyIdentity from "./my-identity"
import DashboardNavbarNative from "../../../layout/dashboard-navbar-native"
import CheckMark from "../../../svg/check-mark"

export default function AccountInfoWeb() {
	const [t] = useTranslation()

	const [changePasswordModalOpened, setChangePasswordModalOpened] = useState(
		false
	)
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const [checkBox, setCheckBox] = useState(false)

	return (
		<Platform web={Group} of="group" native={Column} of="component">
			{Platform.OS === "web" && (
				<Heading level="2">{t("settings:account")}</Heading>
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

			<Column of="small">
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
						style={
							({ borderColor: Colors.stroke }, Platform.web && { flex: 2 })
						}
					/>
				</Platform>
			</Column>

			<Column of="small">
				<Heading level="5">{t("settings:associateEmails")}</Heading>
				<Paragraph>{t("settings:subTitles.documentEmails")}</Paragraph>
			</Column>

			<Column of="section">
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
			</Column>
		</Platform>
	)
}

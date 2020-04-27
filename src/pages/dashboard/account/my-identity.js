import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Platform, View } from "react-native"
import { Group, Hairline, Flex, Row, Column } from "../../../layout"
import { Heading, Paragraph, Text } from "../../../text"
import { Colors } from "../../../theme"
import { TextField, Dropdown, CheckBox } from "../../../forms"
import Button from "../../../widgets/button"
import ChangePasswordModal from "../ChangePasswordContainer"
import DashboardNavBarWeb from "../../../layout/dashboard-navbar-web"
import DashboardNavbarNative from "../../../layout/dashboard-navbar-native"

export default function MyIdentity() {
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
					<Heading level="2">{t("titles:identity")}</Heading>
				</Flex>
			</Row>

			<Dropdown
				label={t("forms:labels.dropdowns.juridiction")}
				placeholder=""
				noFocusToggle
			/>

			<Row of="component">
				<TextField label={t("forms:labels.socanNO")} placeholder="" />
				<TextField label={t("forms:labels.ipiNO")} placeholder="" />
			</Row>

			<Row of="component">
				<TextField label={t("forms:labels.artistiNO")} placeholder="" />
				<TextField label={t("forms:labels.ipnNO")} placeholder="" />
			</Row>

			<Row of="component">
				<TextField label={t("forms:labels.udaNO")} placeholder="" />
				<TextField label={t("forms:labels.gmmqNO")} placeholder="" />
			</Row>

			<Row of="component">
				<TextField label={t("forms:labels.soproqNO")} placeholder="" />
				<TextField label={t("forms:labels.isniNO")} placeholder="" />
			</Row>

			<CheckBox
				label={t("general:checkbox.makePublic")}
				onChange={setCheckBox}
				checked={checkBox}
			/>

			<Row of="component">
				<TextField label="URI" placeholder="" />
			</Row>

			<Row of="component">
				<TextField
					label={t("forms:labels.birthday")}
					placeholder=""
					style={{ flex: 0.5 }}
				/>
			</Row>

			<Hairline />
		</>
	)
}

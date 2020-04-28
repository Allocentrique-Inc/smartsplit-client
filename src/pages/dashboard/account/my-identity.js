import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "../../../platform"
import { Group, Hairline, Flex, Row, Column } from "../../../layout"
import { Heading, Paragraph, Text } from "../../../text"
import { Colors } from "../../../theme"
import { TextField, Dropdown, CheckBox } from "../../../forms"
import { SearchAndTag } from "../../../forms/search-and-tag"
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
			{Platform.OS === "web" && (
				<>
					<Row of="component">
						<Flex>
							<Heading level="2">{t("settings:identity")}</Heading>
						</Flex>
					</Row>
				</>
			)}

			<Dropdown
				label={t("forms:labels.dropdowns.juridiction")}
				placeholder=""
				noFocusToggle
			/>

			<Platform web={Row} of="component" native={{ flex: 1 }}>
				<TextField label={t("forms:labels.socanNO")} placeholder="" />
				<TextField label={t("forms:labels.ipiNO")} placeholder="" />
			</Platform>

			<Platform web={Row} of="component" native={{ flex: 1 }}>
				<TextField label={t("forms:labels.artistiNO")} placeholder="" />
				<TextField label={t("forms:labels.ipnNO")} placeholder="" />
			</Platform>

			<Platform web={Row} of="component" native={{ flex: 1 }}>
				<TextField label={t("forms:labels.udaNO")} placeholder="" />
				<TextField label={t("forms:labels.gmmqNO")} placeholder="" />
			</Platform>

			<Platform web={Row} of="component" native={{ flex: 1 }}>
				<TextField label={t("forms:labels.soproqNO")} placeholder="" />
				<TextField label={t("forms:labels.isniNO")} placeholder="" />
			</Platform>

			<CheckBox
				label={t("general:checkbox.makePublic")}
				onChange={setCheckBox}
				checked={checkBox}
			/>

			<Button
				secondary
				text={
					<Text link bold>
						{t("general:buttons.addUsername")}
					</Text>
				}
				size={buttonSize}
				style={({ borderColor: Colors.stroke }, Platform.web && { flex: 1 })}
			/>
			{Platform.web && <Flex />}

			<Row of="component">
				<TextField
					label={t("forms:labels.birthday")}
					placeholder=""
					style={Platform.web && { flex: 0.5 }}
				/>
			</Row>

			{/* <SearchAndTag
					label={t("forms:labels.organisations")}
					placeholder={t("forms:placeholders.organisations")}
			/> */}

			<Row of="component">
				<TextField label="URI" placeholder="" />
			</Row>

			{Platform.OS === "web" && <Hairline />}
		</>
	)
}

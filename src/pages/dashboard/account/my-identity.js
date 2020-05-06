import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { View, ScrollView } from "react-native"
import { Platform } from "../../../platform"
import { Group, Hairline, Flex, Row, Column, Spacer } from "../../../layout"
import { Heading, Paragraph, Text } from "../../../text"
import { Colors } from "../../../theme"
import { TextField, Dropdown, CheckBox } from "../../../forms"
import { SearchAndTag } from "../../../forms/search-and-tag"
import Button from "../../../widgets/button"
import ChangePasswordModal from "../ChangePasswordContainer"
import NewUsernameModal from "./new-username"
import DashboardNavbar from "../../../layout/dashboard-navbar"

export default function MyIdentity() {
	const [t] = useTranslation()

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const [checkBox, setCheckBox] = useState(false)

	const [showNewUsernameModalOpen, setShowNewUsernameModalOpen] = useState(
		false
	)

	return (
		<ScrollView>
			{Platform.native && <DashboardNavbar header={t("settings:profile")} />}

			<Spacer of="section" />
			<Column of="group">
				{Platform.web && <Heading level="2">{t("settings:identity")}</Heading>}

				{/* <Dropdown
				label={t("forms:labels.dropdowns.juridiction")}
				placeholder=""
				noFocusToggle
			/> */}

				{/* 	<Dropdown
					label={t("forms:labels.dropdowns.nationality")}
					placeholder=""
					noFocusToggle
				/> */}

				{/* <SearchAndTag
					label={t("forms:labels.organisations")}
					placeholder={t("forms:placeholders.organisations")}
				/> */}

				<Heading level="5">{t("identifiers:title")}</Heading>
				<Paragraph>{t("identifiers:subTitle")}</Paragraph>

				<Platform web={Row} of="component" native={{ flex: 1 }}>
					<TextField
						label={t("forms:labels.socanNO")}
						placeholder={t("forms:placeholders.member")}
					/>
					<TextField
						label={t("forms:labels.ipiNO")}
						placeholder={t("forms:placeholders.ipi")}
					/>
				</Platform>

				<Platform web={Row} of="component" native={{ flex: 1 }}>
					<TextField
						label={t("forms:labels.artistiNO")}
						placeholder={t("forms:placeholders.member")}
					/>
					<TextField
						label={t("forms:labels.ipnNO")}
						placeholder={t("forms:placeholders.ipn")}
					/>
				</Platform>

				<Platform web={Row} of="component" native={{ flex: 1 }}>
					<TextField
						label={t("forms:labels.udaNO")}
						placeholder={t("forms:placeholders.member")}
					/>
					<TextField
						label={t("forms:labels.gmmqNO")}
						placeholder={t("forms:placeholders.member")}
					/>
				</Platform>

				<Platform web={Row} of="component" native={{ flex: 1 }}>
					<TextField
						label={t("forms:labels.soproqNO")}
						placeholder={t("forms:placeholders.member")}
					/>
					<TextField
						label={t("forms:labels.isniNO")}
						placeholder={t("forms:placeholders.isni")}
					/>
				</Platform>

				<CheckBox
					label={t("general:checkbox.makePublic")}
					onChange={setCheckBox}
					checked={checkBox}
				/>
				<Row of="component">
					<Button
						secondary
						text={
							<Text link bold>
								{t("general:buttons.addUsername")}
							</Text>
						}
						size={buttonSize}
						style={{ borderColor: Colors.stroke, flex: 1 }}
						onClick={() => {
							setShowNewUsernameModalOpen(true)
						}}
					/>
					{Platform.web && <Flex />}
				</Row>

				{showNewUsernameModalOpen && (
					<NewUsernameModal
						visible={showNewUsernameModalOpen}
						onRequestClose={() => setShowNewUsernameModalOpen(false)}
					/>
				)}

				<Row of="component">
					<TextField
						label={t("forms:labels.birthday")}
						placeholder={t("forms:placeholders.birthday")}
						style={{ flex: 1 }}
					/>
					{Platform.web && <Flex />}
				</Row>

				<TextField
					label={t("forms:labels.uri")}
					placeholder={t("forms:placeholders.uri")}
				/>
			</Column>
		</ScrollView>
	)
}

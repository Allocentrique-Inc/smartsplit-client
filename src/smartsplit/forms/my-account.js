import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ScrollView } from "react-native"
import { Platform } from "../../platform"
import { Group, Hairline, Flex, Row, Column, NoSpacer } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { Colors } from "../../theme"
import { TextField, Select, CheckBox, PhoneNumberField } from "../../forms"
import Button from "../../widgets/button"
import ConfirmPhoneModal from "../../pages/dashboard/confirm-phone"
import { MailList } from "../components/mail-list"
import { Status } from "../../utils/enums"

export default function MyAccount() {
	const { t, i18n } = useTranslation()
	const [confirmPhoneModal, setConfirmPhoneModal] = useState(false)
	const emails = [
		{
			email: "main@iptoki.com",
			status: Status.main,
		},
		{
			email: "active@iptoki.com",
			status: Status.active,
		},
		{
			email: "pending@iptoki.com",
			status: Status.pending,
		},
	]

	function handleLanguageChange(language) {
		i18n.changeLanguage(language)
	}

	return (
		<Column of="group">
			<NoSpacer>
				<ConfirmPhoneModal
					visible={confirmPhoneModal}
					onRequestClose={() => setConfirmPhoneModal(false)}
				/>
			</NoSpacer>
			{Platform.web && <Heading level="2">{t("settings:settings")}</Heading>}
			<TextField label={t("forms:labels.civicAddress")} />
			{Platform.web && (
				<>
					<Row of="component">
						<Select
							name="locale"
							label={t("forms:labels.dropdowns.language")}
							options={[
								{ key: "fr", value: "Français" },
								{ key: "en", value: "English" },
							]}
							onChange={handleLanguageChange}
						/>
						<Flex />
					</Row>

					<Row of="component" valign="bottom">
						<PhoneNumberField
							name="phoneNumber"
							label={t("forms:labels.phone")}
						/>
						<Button
							secondary
							bold
							text={t("general:buttons.validNo")}
							onClick={() => setConfirmPhoneModal(true)}
						/>
					</Row>
				</>
			)}

			{Platform.native && <PhoneNumberField label={t("forms:labels.phone")} />}
			<MailList
				label={t("forms:labels.myEmails")}
				emails={emails}
				description={t("forms:descriptions.myEmails")}
			/>
		</Column>
	)
}

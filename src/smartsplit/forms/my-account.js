import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
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
import { useAuthUser } from "../../../redux/auth/hooks"
import Label from "../../forms/label"

export default function MyAccount({ title }) {
	const { t, i18n } = useTranslation()
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
			{title && <Heading level="2">{title}</Heading>}
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

					<MobilePhoneRow />
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

export function MobilePhoneRow() {
	const { t, i18n } = useTranslation()
	const [confirmPhoneModal, setConfirmPhoneModal] = useState(false)

	const dispatch = useDispatch()
	const user = useAuthUser()
	const mobilePhone = (user.data && user.data.mobilePhone) || {}
	const [inputNumber, setInputNumber] = useState(mobilePhone.number || "")
	const [error, setError] = useState(null)

	const hasChanged = (mobilePhone.number || "") !== inputNumber

	function savePhoneNumber() {
		if (hasChanged || mobilePhone.status === "unverified") {
			user
				.update({ phoneNumber: inputNumber })
				.then(() => setConfirmPhoneModal(true))
				.catch((e) => setError(e.message))
		}
	}

	function onConfirmClose() {
		setConfirmPhoneModal(false)
		dispatch(user.read())
	}

	return (
		<Label
			label={t("forms:labels.phone")}
			component={Row}
			of="component"
			error={error}
		>
			<PhoneNumberField
				status={!hasChanged && mobilePhone.status}
				onChangeText={setInputNumber}
				value={inputNumber}
			/>

			<Row flex={1}>
				{(hasChanged || mobilePhone.status === "unverified") && (
					<Button
						secondary
						bold
						text={t("general:buttons.validNo")}
						onClick={savePhoneNumber}
					/>
				)}

				<ConfirmPhoneModal
					visible={confirmPhoneModal}
					onRequestClose={onConfirmClose}
				/>
			</Row>
		</Label>
	)
}

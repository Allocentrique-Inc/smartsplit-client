import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { TouchableOpacity } from "react-native"
import { Platform } from "../../platform"
import { DialogModal } from "../../widgets/modal"
import { Modal } from "../../widgets/modal"
import Button from "../../widgets/button"
import { Section, Column, Row, Group, Flex } from "../../layout"
import { TextField, PasswordField, CheckBox } from "../../forms"
import { Text, Heading, Paragraph } from "../../text"
import { Colors } from "../../theme"
import TypographyStyles from "../../styles/typography"
import ProgressBar from "../../widgets/progress-bar"
import Scrollable from "../../widgets/scrollable"
import { notEmptyValidator, sameValidator } from "../../../helpers/validators"

export default function DeleteAccountModal(props) {
	const [t] = useTranslation()

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const [confirmDelete, setConfirmDelete] = useState("")

	const canSubmit =
		confirmDelete.toLowerCase().replace("é", "e") === t("deletion:deleteWord")

	const handleSubmit = () => {
		if (canSubmit === setConfirmDelete) return true
	}

	//const { deleteAccount } = props

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("deletion:destroy")}
			buttons={
				<>
					<Button
						text={t("general:buttons.cancel")}
						tertiary
						onClick={props.onRequestClose}
						size={buttonSize}
						style={Platform.OS !== "web" && { flex: 1 }}
					/>
					<Button
						megaError
						style={{ backgroundColor: Colors.error }}
						text={t("general:buttons.delete")}
						disabled={!canSubmit}
						onClick={handleSubmit}
						size={buttonSize}
						style={Platform.OS !== "web" && { flex: 1 }}
					/>
				</>
			}
		>
			<Group
				of="group"
				style={Platform.OS === "web" && { minWidth: 560, alignSelf: "center" }}
			>
				<Heading level="3" style={{ color: Colors.error }}>
					{t("deletion:warningTitle")}
				</Heading>
				<Paragraph>{t("deletion:warningSubTitle")}</Paragraph>
				<TextField
					label={t("deletion:writeDelete")}
					placeholder={t("forms:placeholders.delete")}
					value={confirmDelete}
					onChangeText={setConfirmDelete}
				/>
				<Paragraph>{t("deletion:confirm")}</Paragraph>
			</Group>
		</DialogModal>
	)
}

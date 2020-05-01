import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "../../../platform"
import { DialogModal } from "../../../components/modal"
import Button from "../../../components/button"
import { Section, Column, Row, Group, Flex } from "../../../layout"
import { TextField } from "../../../components/forms/form-controls"
import { Text, Paragraph } from "../../../text"

export default function ConfirmPhoneModal(props) {
	const [t] = useTranslation()
	const buttonSize = Platform.OS === "web" ? "medium" : "large"
	const [canSubmit, setCanSubmit] = useState(false)

	const handleSubmit = () => {
		if (!canSubmit) return false
	}

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("confirmNO:title")}
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
						text={t("general:buttons.confirmNO")}
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
				<Paragraph>{t("confirmNO:codeSent")}</Paragraph>
				<TextField
					label={t("confirmNO:enterNO")}
					placeholder=""
					onChangeText={setCanSubmit}
					//value={verificationCode}
				/>
			</Group>
		</DialogModal>
	)
}

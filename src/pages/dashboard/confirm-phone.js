import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "../../platform"
import { DialogModal } from "../../widgets/modal"
import Button from "../../widgets/button"
import { Section, Column, Row, Group, Flex } from "../../layout"
import { TextField } from "../../forms"
import { Text, Paragraph } from "../../text"

export default function ConfirmPhoneModal(props) {
	const [t] = useTranslation()
	const [verificationCode, setVerificationCode] = useState("")

	const handleSubmit = props.onRequestClose
	const canSubmit = verificationCode !== ""

	function onVerificationCodeChanged(code) {
		setVerificationCode(code.replace(/[^0-9]/, ""))
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
					/>
					<Button
						text={t("general:buttons.confirmNO")}
						disabled={!canSubmit}
						onClick={handleSubmit}
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
					onChangeText={onVerificationCodeChanged}
					value={verificationCode}
				/>
			</Group>
		</DialogModal>
	)
}

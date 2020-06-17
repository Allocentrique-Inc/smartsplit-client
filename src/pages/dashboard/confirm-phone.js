import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "../../platform"
import { DialogModal } from "../../widgets/modal"
import Button from "../../widgets/button"
import { Section, Column, Row, Group, Flex } from "../../layout"
import { TextField } from "../../forms"
import { Text, Paragraph } from "../../text"
import { verifyPhone } from "../../../api/users"

export default function ConfirmPhoneModal({
	visible,
	onRequestClose,
	user_id,
}) {
	const [t] = useTranslation()
	const [verificationCode, setVerificationCode] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const canSubmit = verificationCode !== "" && !isLoading

	function onVerificationCodeChanged(code) {
		setVerificationCode(code.replace(/[^0-9]/, ""))
	}

	function handleSubmit() {
		setIsLoading(true)

		verifyPhone(verificationCode)
			.then(function () {
				setVerificationCode("")
				setIsLoading(false)
				onRequestClose && onRequestClose()
			})
			.catch(function (e) {
				setIsLoading(false)
				setError(
					e.code === "user_invalid_verification_code"
						? t("confirmNO:invalidCode")
						: e.message
				)
			})
	}

	return (
		<DialogModal
			visible={visible}
			onRequestClose={onRequestClose}
			title={t("confirmNO:title")}
			buttons={
				<>
					<Button
						text={t("general:buttons.cancel")}
						tertiary
						onClick={onRequestClose}
					/>
					<Button
						text={t("general:buttons.confirm")}
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
					error={error}
				/>
			</Group>
		</DialogModal>
	)
}

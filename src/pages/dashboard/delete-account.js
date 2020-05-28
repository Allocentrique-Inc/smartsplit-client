import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { Platform } from "../../platform"
import { DialogModal } from "../../widgets/modal"
import Button from "../../widgets/button"
import { Column, Row, Group, Flex } from "../../layout"
import { TextField } from "../../forms"
import { Text, Heading, Paragraph } from "../../text"
import { Colors } from "../../theme"
import { useAuthUser } from "../../../redux/auth/hooks"
import { logout } from "../../../redux/auth/actions"

export default function DeleteAccountModal(props) {
	const [t] = useTranslation()
	const dispatch = useDispatch()
	const [isDeleting, setIsDeleting] = useState(false)
	const [confirmDelete, setConfirmDelete] = useState("")
	const [error, setError] = useState(null)
	const user = useAuthUser()

	const canSubmit =
		!isDeleting &&
		confirmDelete.toLowerCase().replace("é", "e") === t("deletion:deleteWord")

	const handleSubmit = () => {
		if (!canSubmit) {
			return
		}

		setIsDeleting(true)
		user
			.destroy()
			.then(function () {
				dispatch(logout())
				onRequestClose()
			})
			.catch(function (e) {
				setIsDeleting(false)
				setError(e.message)
			})
	}

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
					/>
					<Button
						megaError
						text={t("general:buttons.delete")}
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
				<Column of="component">
					<Heading level="3" style={{ color: Colors.error }}>
						{t("deletion:warningTitle")}
					</Heading>
					<Paragraph>{t("deletion:warningSubTitle")}</Paragraph>
				</Column>

				<TextField
					label={t("deletion:writeDelete")}
					value={confirmDelete}
					onChangeText={setConfirmDelete}
				/>
				<Paragraph>{t("deletion:confirm")}</Paragraph>

				{error && <Text error>{error}</Text>}
			</Group>
		</DialogModal>
	)
}

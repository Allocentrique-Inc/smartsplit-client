import React, { useState } from "react"
import { Platform } from "react-native"
import { DialogModal } from "../../widgets/modal"
import { useTranslation } from "react-i18next"
import { notEmptyValidator } from "../../../helpers/validators"
import { Group, Row } from "../../layout"
import { Paragraph } from "../../text"
import { TextField } from "../../forms"
import UserAvatar from "../../smartsplit/user/avatar"
import Button from "../../widgets/button"

export function SplitUserEmailRow(props) {
	const { user, artistName } = props
	const [email, setEmail] = useState("")
	const [t] = useTranslation()
	return (
		<Row
			of="component"
			style={Platform.OS === "web" && { minWidth: 560, alignSelf: "center" }}
		>
			<UserAvatar size="small" user={user} />
			<TextField
				label={artistName}
				placeholder={t("split:send.email")}
				onChangeText={setEmail}
				value={email}
			/>
		</Row>
	)
}

export default function SendSplitModal({
	visible,
	onRequestClose,
	onSubmit,
	users,
}) {
	const [email] = useState("")

	const validEmail = notEmptyValidator(email)

	const canSubmit = validEmail

	const [t] = useTranslation()

	return (
		<DialogModal
			visible={visible}
			onRequestClose={onRequestClose}
			title={t("split:send.title")}
			buttons={
				<>
					<Button
						text={t("general:buttons.cancel")}
						tertiary
						onClick={onRequestClose}
					/>
					<Button
						text={t("general:buttons.send")}
						disabled={!canSubmit}
						onClick={onSubmit}
					/>
				</>
			}
		>
			<Group of="group">
				<Paragraph>{t("split:send.paragraph")}</Paragraph>

				{users && users.map((user) => <SplitUserEmailRow user={user} />)}
			</Group>
		</DialogModal>
	)
}

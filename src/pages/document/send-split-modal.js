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

export default function SendSplitModal(props) {
	const [email] = useState("")

	const validEmail = notEmptyValidator(email)

	const canSubmit = validEmail

	const [t] = useTranslation()

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("split:send.title")}
			buttons={
				<>
					<Button
						text={t("general:buttons.cancel")}
						tertiary
						onClick={props.onRequestClose}
					/>
					<Button
						text={t("general:buttons.send")}
						disabled={!canSubmit}
						onClick={props.onSubmit}
					/>
				</>
			}
		>
			<Group
				of="group"
				style={Platform.OS === "web" && { minWidth: 560, alignSelf: "center" }}
			>
				<Paragraph>{t("split:send.paragraph")}</Paragraph>

				{props.users.map((user) => (
					<Row of="component">
						<SplitUserEmailRow user={user} />
					</Row>
				))}
			</Group>
		</DialogModal>
	)
}

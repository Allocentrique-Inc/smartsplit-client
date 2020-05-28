import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Group } from "../../layout"
import { DialogModal } from "../../widgets/modal"
import { mapFragment } from "../../utils/react"
import { Text } from "../../text"
import { Button } from "../../widgets/button"

export default function NewEmailModal(props) {
	const { t } = useTranslation()

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("settings:emailVerificationModal.title")}
			buttons={
				<Button
					primary
					text={t("general:buttons.comprendo")}
					onClick={props.onRequestClose}
				/>
			}
		>
			<Group>
				{mapFragment(
					t("settings:emailVerificationModal.body")(props.email),
					(p) => (
						<Text>{p}</Text>
					)
				)}
			</Group>
		</DialogModal>
	)
}

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Column, Group } from "../../layout"
import { DialogModal } from "../../widgets/modal"
import { mapFragment } from "../../utils/react"
import { Text } from "../../text"
import { Button } from "../../widgets/button"
import EmailState from "../../mobX/states/settingsStates/EmailState"
import EmailModel from "../../mobX/models/settings/EmailModel"
import TextField from "../../forms/text"
import { useStorePath } from "../../mobX"
import { observer } from "mobx-react"
export default observer(function NewEmailModal(props) {
	const { t } = useTranslation()
	const emailState: EmailState = useStorePath("settings", "emails")
	const model: EmailModel = useStorePath("settings", "emails", "model")
	console.log(model)
	return (
		<DialogModal
			visible={emailState.adding}
			onRequestClose={() => {
				emailState.cancel()
			}}
			title={t("settings:emailVerificationModal.title")}
			buttons={
				<>
					<Button
						primary
						text={t("general:buttons.cancel")}
						onClick={() => emailState.cancel()}
					/>
					<Button
						primary
						text={t("general:buttons.add")}
						onClick={() => emailState.submit()}
					/>
				</>
			}
		>
			<Group>
				<Column of="group">
					<TextField field={model.email} />
				</Column>
			</Group>
		</DialogModal>
	)
})

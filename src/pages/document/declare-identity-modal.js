import React, { useState } from "react"
import { Platform } from "react-native"
import { DialogModal } from "../../widgets/modal"
import { useTranslation } from "react-i18next"
import { Group } from "../../layout"
import { CheckBox } from "../../forms"
import { Text } from "../../text"
import Button from "../../widgets/button"

export default function DeclareIdentityModal(props) {
	const [t] = useTranslation()

	const { firstName, lastName, workPiece } = props
	const [agreeTerms1, setAgreeTerms1] = useState(false)
	const [agreeTerms2, setAgreeTerms2] = useState(false)

	const canSubmit = agreeTerms1 && agreeTerms2

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("identity:title")}
			buttons={
				<>
					<Button
						text={t("general:buttons.cancel")}
						tertiary
						onClick={props.onRequestClose}
					/>
					<Button
						text={t("general:buttons.toAccept")}
						disabled={!canSubmit}
						onClick={props.onSubmit}
					/>
				</>
			}
		>
			<Group
				of="component"
				style={Platform.OS === "web" && { minWidth: 560, alignSelf: "center" }}
			>
				<CheckBox onChange={setAgreeTerms1} checked={agreeTerms1}>
					<Text>{t("identity:Ideclare")(props.firstName, props.lastName)}</Text>
				</CheckBox>

				<CheckBox onChange={setAgreeTerms2} checked={agreeTerms2}>
					<Text>{t("identity:Iaccept")}</Text>
				</CheckBox>
			</Group>
		</DialogModal>
	)
}

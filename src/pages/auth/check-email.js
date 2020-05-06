import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { View, Platform } from "react-native"
import { Text } from "../../text"
import { DialogModal } from "../../widgets/modal"
import { Modal } from "../../widgets/modal"
import Button from "../../widgets/button"
import HighFive from "../../../assets/svg/high-five.svg"
import { Group } from "../../layout"

export function CheckEmailModal(props) {
	const [t] = useTranslation()

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("passwordIssues:checkEmail")}
			buttons={
				<Button
					text={t("general:buttons.comprendo")}
					onClick={props.onRequestClose}
				/>
			}
		>
			<Group of="group" style={{ maxWidth: 560, alignSelf: "center" }}>
				<View style={{ alignItems: "center" }}>
					<HighFive />
				</View>
				<Text>{t("passwordIssues:validate")}</Text>
			</Group>
		</DialogModal>
	)
}

export default function CheckEmailPage(props) {
	const [modalOpen, setModal] = useState(false)

	return (
		<>
			<Button text="Test" onClick={() => setModal(true)} />

			<CheckEmailModal
				visible={modalOpen}
				onRequestClose={() => setModal(false)}
				{...props}
			/>
		</>
	)
}

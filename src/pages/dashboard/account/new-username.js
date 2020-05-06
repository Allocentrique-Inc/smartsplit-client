import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "../../../platform"
import { DialogModal } from "../../../widgets/modal"
import { Modal } from "../../../widgets/modal"
import Button from "../../../widgets/button"
import { Section, Column, Row, Group, Flex } from "../../../layout"
import { TextField, Dropdown } from "../../../forms"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors } from "../../../theme"
import Scrollable from "../../../widgets/scrollable"

export default function NewUsernameModal(props) {
	const [t] = useTranslation()

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const [canSubmit, setCanSubmit] = useState(false)

	const handleSubmit = () => {
		if (!canSubmit) return false
	}

	//const { deleteAccount } = props

	return (
		<Scrollable>
			<DialogModal
				visible={props.visible}
				onRequestClose={props.onRequestClose}
				title={t("newUsername:title")}
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
							text={t("general:buttons.add")}
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
					style={
						Platform.OS === "web" && { minWidth: 560, alignSelf: "center" }
					}
				>
					<Paragraph>{t("newUsername:subTitle")}</Paragraph>

					<Dropdown
						label={t("forms:labels.managingCie")}
						placeholder={t("forms:labels.dropdowns.organisations")}
						noFocusToggle
					/>
				</Group>
			</DialogModal>
		</Scrollable>
	)
}

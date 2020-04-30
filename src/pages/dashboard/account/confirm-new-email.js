import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "../../../platform"
import { DialogModal } from "../../../widgets/modal"
import Button from "../../../widgets/button"
import { Section, Column, Row, Group, Flex } from "../../../layout"
import { TextField } from "../../../forms"
import { Text, Paragraph } from "../../../text"

export default function ConfirmEmailModal(props) {
	const [t] = useTranslation()
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	return (
		<>
			<DialogModal
				visible={props.visible}
				onRequestClose={props.onRequestClose}
				title={t("addEmail:title")}
				buttons={
					<>
						<Button
							text={t("general:buttons.comprendo")}
							onClick={props.onRequestClose}
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
					<Text>
						{t("addEmail:paragraph")} {/* <Text bold>{props.newEmail}</Text> */}
						{t("addEmail:paragraph2")}
						<Text italic> Smartsplit </Text>
						{t("addEmail:paragraph3")}
					</Text>
					<Text>{t("addEmail:checkEmail")}</Text>
				</Group>
			</DialogModal>
		</>
	)
}

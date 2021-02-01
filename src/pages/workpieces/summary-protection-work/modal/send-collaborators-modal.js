import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import TextField from "../../../../forms/text"
import { Column, Flex, Group, Row } from "../../../../layout"
import UserAvatar from "../../../../smartsplit/user/avatar"
import { Text } from "../../../../text"
import Button from "../../../../widgets/button"
import { DialogModal } from "../../../../widgets/modal"

function SendCollaboratorsModal(props) {
	const { onRequestClose, visible, data, ...nextProp } = props
	const { t } = useTranslation()
	const [value1, setValue1] = useState("")
	const [value2, setValue2] = useState("Erykahbadu@gmail.com")
	const [value3, setValue3] = useState("georgesbenson@gmail.com")
	const dataArr = Array.from(
		data || [
			{ url: "", name: "Quest Love", email: "" },
			{ url: "", name: "Erykah Badu", email: "Erykahbadu@gmail.com" },
			{ url: "", name: "Georges Benson", email: "georgesbenson@gmail.com" },
		]
	)
	return (
		<DialogModal
			visible={visible}
			key="send-collaborators-modal"
			title={t("shareYourRights:sendCollaboratorModal.title")}
			size="medium"
			titleLevel={4}
			onRequestClose={onRequestClose}
			buttons={
				<>
					<Button
						text={t("shareYourRights:sendCollaboratorModal.toCancel")}
						secondary
						onClick={onRequestClose}
					/>
					<Button text={t("shareYourRights:sendCollaboratorModal.toSend")} />
				</>
			}
		>
			<Group>
				<Row>
					<Text secondary>
						{t("shareYourRights:sendCollaboratorModal.desc")}
					</Text>
				</Row>
				{dataArr.map((item, index) => (
					<AvatarTextField
						picture={item.url}
						key={index}
						title={item.name}
						placeholder={t(
							"shareYourRights:sendCollaboratorModal.enterEmailAddress"
						)}
						style={{ paddingTop: 40 }}
						value={item.email}
					/>
				))}
			</Group>
		</DialogModal>
	)
}

export function AvatarTextField(props) {
	const {
		title,
		value,
		placeholder,
		onChangeText,
		picture,
		...nextProp
	} = props
	return (
		<Row {...nextProp}>
			<Column>
				<UserAvatar size="small" picture={picture} />
			</Column>
			<Flex>
				<Column style={{ paddingLeft: 16 }}>
					<Row>
						<Text>{title}</Text>
					</Row>
					<Row style={{ paddingTop: 8 }}>
						<TextField
							value={value}
							onChangeText={onChangeText}
							placeholder={placeholder || ""}
						/>
					</Row>
				</Column>
			</Flex>
		</Row>
	)
}

export default SendCollaboratorsModal

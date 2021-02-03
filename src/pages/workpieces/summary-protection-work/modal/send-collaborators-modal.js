import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import TextField from "../../../../forms/text"
import { Column, Flex, Group, Row } from "../../../../layout"
import UserAvatar from "../../../../smartsplit/user/avatar"
import { Text } from "../../../../text"
import Button from "../../../../widgets/button"
import { DialogModal } from "../../../../widgets/modal"
import { useStores } from "../../../../mobX"
import { useCurrentWorkpiece, useCurrentWorkpieceId } from "../../context"
import { getArtistName } from "../../workpiece-summary/workpiece-sheet"
function SendCollaboratorsModal(props) {
	const { collaborators, auth } = useStores()
	const workpiece = useCurrentWorkpiece()
	const rightHolderIds = workpiece.data.rightHolders
	if (!rightHolderIds) return null
	const rightHolders = rightHolderIds.map((id) =>
		id === auth.user_id ? auth.user.data : collaborators.map[id]
	)
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
				{rightHolders.map((user, index) => (
					<AvatarTextField
						picture={user.url}
						key={index}
						title={getArtistName(user)}
						placeholder={t(
							"shareYourRights:sendCollaboratorModal.enterEmailAddress"
						)}
						style={{ paddingTop: 40 }}
						value={user.email}
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

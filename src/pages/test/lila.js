import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "../../platform"
import { Group, Flex, Row, Column } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { TextField } from "../../forms"
import Button from "../../widgets/button"
import Label from "../../forms/label"

import InviteNewUserModal from "../document/invite-new-user-modal"
//import SendSplitModal from "../../pages/document/send-split-modal"

export default function TestsModals() {
	const [t] = useTranslation()

	const [inviteNewUserOpen, setInviteNewUserOpen] = useState(false)
	const [sendSplitModalOpen, setSendSplitModalOpen] = useState(false)

	return (
		<Group of="group">
			{Platform.web && <Heading level="2">Tests des modales</Heading>}

			<Button
				text="Invite New User"
				onClick={() => setInviteNewUserOpen(true)}
			/>

			<InviteNewUserModal
				visible={inviteNewUserOpen}
				onRequestClose={() => setInviteNewUserOpen(false)}
			/>

			{/* <Row>
				<Button
					text="Send Split Modal"
					onClick={() => setSendSplitModalOpen(true)}
				/>
			</Row>

			<SendSplitModal
				visible={sendSplitModalOpen}
				onRequestClose={() => setSendSplitModalOpen(false)}
				users={[
					{
						firstName: "Example",
						lastName: "Example",
						email: null,
						artistName: "Quest Love",
						avatarUrl: "...",
					},
					{
						firstName: "Erykah",
						lastName: "Badu",
						artistName: "Erykah Badu",
						email: "Erykahbadu@gmail.com",
						avatarUrl: "...",
					},
					{
						firstName: "Georges",
						lastName: "Benson",
						email: "georgesbenson@gmail.com",
						artistName: "Georges Benson",
						avatarUrl: "...",
					},
				]}
			/> */}
		</Group>
	)
}

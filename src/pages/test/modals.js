import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Platform } from "../../platform"
import { Group, Flex, Row, Column, Section } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import Button from "../../widgets/button"

import EditModal from "../../smartsplit/rightholders/edit-modal"
import { AuthModalTestPage } from "../auth/modals"
import { AddCollaboratorModal } from "../dashboard/collaborators"
import { DeclareIdentityModal } from "../auth/modals"
import SendSplitModal from "../document/send-split-modal"

export default function ModalTests() {
	const [t] = useTranslation()

	const [modal1, setModal1] = useState(false)
	const [modal2, setModal2] = useState(false)
	const [modal3, setModal3] = useState(false)
	const [modal, setModal] = useState(false)

	return (
		<Group of="group">
			<Heading level="2">Tests des modales</Heading>
			<Row of="group" wrap>
				<Button text="AddCollabArtist" onClick={() => setModal1(true)} />
				<Button text="DeclareIdentity" onClick={() => setModal2(true)} />
				<Button text="SendSplit" onClick={() => setModal3(true)} />
			</Row>

			<AddCollaboratorModal
				visible={modal1}
				onRequestClose={() => setModal1(false)}
			/>
			<DeclareIdentityModal
				visible={modal2}
				onRequestClose={() => setModal2(false)}
			/>
			<SendSplitModal
				visible={modal3}
				onRequestClose={() => setModal3(false)}
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

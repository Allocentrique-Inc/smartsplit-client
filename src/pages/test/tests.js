import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { Platform } from "../../platform"
import { Group, Hairline, Flex, Row, Column, NoSpacer } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { Colors } from "../../theme"
import { TextField, Dropdown } from "../../forms"
import Button from "../../widgets/button"
import ChangePasswordModal from "../dashboard/change-password"
import DeleteAccountModal from "../dashboard/delete-account"
import DashboardNavbarNative from "../../layout/subscreen"
import Label from "../../forms/label"

import InviteNewUserModal from "../document/invite-new-user-modal"

export default function TestsModals() {
	const [t] = useTranslation()

	const [inviteNewUserOpen, setInviteNewUserOpen] = useState(false)

	return (
		<Column of="group">
			{Platform.web && <Heading level="2">Tests des modales</Heading>}
			<Row>
				<Button
					text="Invite New User"
					onClick={() => setInviteNewUserOpen(true)}
				/>
			</Row>

			<InviteNewUserModal
				visible={inviteNewUserOpen}
				onRequestClose={() => setInviteNewUserOpen(false)}
			/>
		</Column>
	)
}

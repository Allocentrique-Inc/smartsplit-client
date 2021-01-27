import React from "react"
import { observer } from "mobx-react"
import { View } from "react-native"
import { DialogModal } from "../../../../widgets/modal"
import Button from "../../../../widgets/button"
import { Column, Group, Row } from "../../../../layout"
import { Text } from "../../../../text"
import { TextField } from "../../../../forms"
import UserAvatar from "../../../../smartsplit/user/avatar"
import { useTranslation } from "react-i18next"

export default observer(function SendSoundImprintModal(props) {
	const { visible, onRequestClose } = props
	const { t } = useTranslation()
	return (
		<DialogModal
			key="send-sound-imprint"
			size="medium"
			visible={visible}
			onRequestClose={onRequestClose}
			noScroll
			title={t("protect:certificate.sendingSoundImprint")}
			buttons={<Button text="Envoyer" />}
		>
			<Group of="group">
				<Column flex={12}>
					<Row>
						<Column flex={12}>
							<Text>{t("protect:certificate.checkAddresses")}</Text>
						</Column>
					</Row>
					<Row style={{ marginTop: 20 }}>
						<Column flex={1}>
							<UserAvatar size="small" />
						</Column>
						<Column flex={11}>
							<TextField label="Erykah Badu" />
						</Column>
					</Row>
					<Row style={{ marginTop: 20 }}>
						<Column flex={1}>
							<UserAvatar size="small" />
						</Column>
						<Column flex={11}>
							<TextField label="Georges Benson" />
						</Column>
					</Row>
				</Column>
			</Group>
		</DialogModal>
	)
})

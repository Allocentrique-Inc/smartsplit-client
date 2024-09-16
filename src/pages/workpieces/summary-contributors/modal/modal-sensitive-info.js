import React, { useState } from "react"
import { observer } from "mobx-react"
import { StyleSheet, View } from "react-native"
import { useTranslation } from "react-i18next"
import { DialogModal } from "../../../../widgets/modal"
import { Column, Group, Row } from "../../../../layout"
import { Text } from "../../../../text"
import UserAvatar from "../../../../smartsplit/user/avatar"
import { Metrics } from "../../../../theme"
import { defaultPicture } from "./item-version-detail"
import DownloadContractInfo from "./download-contract-info"
import Button from "../../../../widgets/button"

const Styles = StyleSheet.create({
	rowTextInput: {
		paddingTop: Metrics.spacing.large,
	},
	fieldColumn: {
		paddingRight: Metrics.spacing.medium,
	},
})

const SensitiveInfoModal = observer((props) => {
	const { data, visible, onRequestClose } = props
	const { t } = useTranslation()
	const dataValue = Array.from(data || [])
	return (
		<DialogModal
			visible={visible}
			key="sensitive-info-modal"
			title={t("shareYourRights:sensitiveInfoModal.label")}
			onRequestClose={onRequestClose}
			buttons={
				<>
					<Button
						text={t("general:buttons.cancel")}
						tertiary
						onClick={onRequestClose}
					/>
					<Button
						text={t("shareYourRights:sensitiveInfoModal.downloadAsPDF")}
					/>
				</>
			}
		>
			<Group>
				<Column flex={1}>
					<Row>
						<Text secondary>
							{t("shareYourRights:sensitiveInfoModal.desc")}
						</Text>
					</Row>
					{dataValue.map((item, index) => {
						const isLast = dataValue.length - 1 === index
						return (
							<DownloadContractInfo data={item} key={index} isLast={isLast} />
						)
					})}
				</Column>
			</Group>
		</DialogModal>
	)
})
export default SensitiveInfoModal

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
			visible={true}
			key="sensitive-info-modal"
			title="Télécharger le contrat"
			onRequestClose={onRequestClose}
			buttons={
				<>
					<Button text="Annuler" tertiary />
					<Button text="Télécharger en PDF" />
				</>
			}
		>
			<Group>
				<Column flex={1}>
					<Row>
						<Text secondary>
							Afin de préparer l’entente entre vous, Smartsplit a besoin
							d’information plus sensible au sujet de tous. Cette information
							est nécessaire afin de produire le document légal que vous pourrez
							imprimer et signer.
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

import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"
import { StyleSheet, View } from "react-native"
import Scrollable from "../../../widgets/scrollable"
import { Column, Flex, Hairline, Row } from "../../../layout"
import Button from "../../../widgets/button"
import { Heading, Text } from "../../../text"
import SectionCollaborator from "./modal/section-collaborators"
import { shareInfo } from "."
import Confidentiality from "./modal/confidentiality"

const Styles = StyleSheet.create({
	layout: { paddingHorizontal: "17%" },
	bodyLayout: { paddingVertical: 56 },
	bottomLayout: {
		justifyContent: "flex-end",
		paddingVertical: 16,
	},
	voteView: {
		marginTop: 32,
		padding: 32,
		borderWidth: 1,
		borderColor: "#DCDFE1",
		borderStyle: "solid",
		borderRadius: 4,
	},
	section: {
		paddingTop: 56,
	},
})

const VotingPage = observer((props) => {
	const { t } = useTranslation()
	const data = shareInfo
	return (
		<Column flex={1}>
			<Scrollable>
				<Column style={[Styles.layout, Styles.bodyLayout]} flex={1}>
					<Row>
						<Column>
							<Heading level={2}>Valider le split de Love You Baby</Heading>
							<Text
								secondary
								style={{ paddingTop: 8 }}
								small
								dangerouslySetInnerHTML={{
									__html:
										"Créé par <span style='color: #2DA84F; font-weight: bold'>Inscience</span> · Mis à jour il y a 3 heures",
								}}
							/>
						</Column>
					</Row>
					<Row style={{ paddingTop: 64 }}>
						<Column>
							<Heading level={3}>Version 1</Heading>
							<Text
								secondary
								small
								dangerouslySetInnerHTML={{
									__html:
										"Créé par <span style='color: #2DA84F; font-weight: bold'>ArtistName</span> il y a 3 heures",
								}}
							/>
						</Column>
					</Row>
					<Row style={Styles.voteView}>
						<Column flex={1}>
							<Flex>
								<SectionCollaborator
									title={t("shareYourRights:collaboratorModal.copyright")}
									data={data.columns.waitingToSend[0].copyright}
								/>
								<SectionCollaborator
									title={t("shareYourRights:collaboratorModal.copyright")}
									data={data.columns.waitingToSend[0].interpretation}
								/>
								<SectionCollaborator
									title={t("shareYourRights:collaboratorModal.copyright")}
									data={data.columns.waitingToSend[0].soundRecording}
								/>
								<Confidentiality
									isModal
									data={data.columns.waitingToSend[0].confidentiality}
									canModify
									style={Styles.section}
								/>
							</Flex>
						</Column>
						<Column flex={1}></Column>
					</Row>
				</Column>
			</Scrollable>
			<Hairline />
			<Row style={[Styles.bottomLayout, Styles.layout]}>
				<Button bold disabled text="Soumettre mon vote" />
			</Row>
		</Column>
	)
})
export default VotingPage

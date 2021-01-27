import React, { useEffect, useState } from "react"
import { Column, Flex, Group, Hairline, Row } from "../../../../layout"
import { useTranslation } from "react-i18next"
import { DialogModal } from "../../../../widgets/modal"
import Button from "../../../../widgets/button"
import { Heading, Text } from "../../../../text"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import moment from "moment"
import ModifierSVG from "../../../../svg/modify-svg"
import ItemVersionDetail from "./item-version-detail"

const Styles = StyleSheet.create({
	highlightWord: {
		color: "#2DA84F",
		fontWeight: "bold",
	},
	modifyBtn: { borderWidth: 1, borderColor: "#DCDFE1", borderStyle: "solid" },
	part: {
		paddingBottom: 16,
	},
	item: {
		paddingTop: 16,
	},
})

const roles = [
	{ id: 1, name: "Auteur" },
	{ id: 2, name: "Compositeur" },
	{ id: 3, name: "Arrangeur" },
]

const data = {
	copyright: [
		{
			uri: "",
			name: "Inscience (toi)",
			role: "Auteur, Compositeur, Arrangeur",
			percent: "88,8%",
			status: 1,
		},
		{
			uri: "",
			name: "Erykah Badu",
			role: "Auteur, Compositeur, Arrangeur",
			percent: "88,8%",
			status: 2,
		},
		{
			uri: "",
			name: "J-Zone",
			role: "Auteur, Compositeur, Arrangeur",
			percent: "88,8%",
			status: 2,
		},
		{
			uri: "",
			name: "Quest Love",
			role: "Auteur, Compositeur, Arrangeur",
			percent: "88,8%",
			status: 2,
		},
		{
			uri: "",
			name: "Ringo Starr",
			role: "Auteur, Compositeur, Arrangeur",
			percent: "88,8%",
			status: 2,
		},
	],
}

function CollaboratorModal(props) {
	const { t } = useTranslation()
	const { visible, onRequestClose } = props

	const getSectionTitle = () => {}
	return (
		<DialogModal
			key="collaborator-modal"
			size="medium"
			visible={visible}
			onRequestClose={onRequestClose}
			title="Version 1"
			titleLevel={3}
			underTitle={
				<Text
					secondary
					small
					dangerouslySetInnerHTML={{
						__html: t("shareYourRights:collaboratorModal.underTitle", {
							name: "ArtistName",
							time: moment("01/27/2021 12:00").startOf("minute").fromNow(),
						}),
					}}
				></Text>
			}
			buttons={
				<>
					<Button
						tertiary
						text={t("shareYourRights:tabBar.dragDrop.createNewversion")}
					/>
					<Button
						text={t(
							"shareYourRights:tabBar.myCollaborators.sendToCollaborators"
						)}
					/>
				</>
			}
		>
			<Group>
				<Column>
					<Row style={Styles.part}>
						<Column flex={10}>
							<Heading level={5}>Droits d’auteur</Heading>
						</Column>
						<Column flex={2}>
							<View>
								<TouchableWithoutFeedback>
									<View style={Styles.modifyBtn}>
										<Row>
											<Column
												flex={1}
												style={{
													alignItems: "center",
													justifyContent: "center",
												}}
											>
												<ModifierSVG />
											</Column>
											<Column flex={3}>
												<Text bold action>
													Modifier
												</Text>
											</Column>
										</Row>
									</View>
								</TouchableWithoutFeedback>
							</View>
						</Column>
					</Row>
					<Hairline />
					<Row style={Styles.item}>
						<Flex>
							<Column>
								<ItemVersionDetail boldPercent data={data.copyright[1]} />
							</Column>
						</Flex>
					</Row>
				</Column>
			</Group>
		</DialogModal>
	)
}
export default CollaboratorModal

import { observer } from "mobx-react"
import React, { useState } from "react"
import { useCurrentWorkpiece } from "../../context"
import { useTranslation } from "react-i18next"
import { Column, Row } from "../../../../layout"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import ArrowLeft from "../../../../svg/arrow-left"
import AlbumArt from "../../../../smartsplit/media/albumArt"
import Button from "../../../../widgets/button"
import { Heading, Text } from "../../../../text"
import Download from "../../../../svg/download-svg"
import SendIcon from "../../../../svg/send-icon"
import { LinkRow } from "../../../../smartsplit/protect/link-row"
import Scrollable from "../../../../widgets/scrollable"
import CertificateImage from "../../../../svg/certificate-image"

const Styles = StyleSheet.create({
	navBarCol: {
		borderBottomColor: "#DCDFE1",
		borderBottomWidth: 2,
	},
	headerButton: {
		marginLeft: 15,
	},
	headerBtnIcon: {
		padding: 8,
		borderColor: "rgb(220, 223, 225)",
		borderWidth: 1,
		borderStyle: "solid",
	},
	boxContent1: {
		marginLeft: 16,
		marginTop: 40,
		padding: 70,
		borderColor: "rgb(220, 223, 225)",
		borderWidth: 1,
		borderStyle: "solid",
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6,
	},
	rowAlignContent: { paddingLeft: 16 },
	boxContent2: {
		marginLeft: 16,
		borderColor: "rgb(220, 223, 225)",
		borderWidth: 1,
		borderStyle: "solid",
		padding: 70,
		borderBottomLeftRadius: 6,
		borderBottomRightRadius: 6,
	},
})

const SummaryPage = observer((props) => {
	const workpiece = useCurrentWorkpiece()
	const { t } = useTranslation()
	const [fileArr, setFileArr] = useState([
		{ title: "Fantôme ", desc: "Par Inscience, Valaire, Robert Meuric" },
		{ title: "Fantôme v1", desc: "Par Inscience, Valaire, Robert Meuric" },
	])

	return (
		<View style={{ height: "100%" }}>
			<Row style={{ width: "100%" }}>
				<Column flex={2} style={[Styles.navBarCol]}>
					<Row of="component" padding="component" valign="center">
						<TouchableWithoutFeedback>
							<View>
								<ArrowLeft />
							</View>
						</TouchableWithoutFeedback>
					</Row>
				</Column>
				<Column flex={8} style={[Styles.navBarCol]}>
					<Row of="component" padding="component" valign="center">
						<AlbumArt />
						<Text bold>Fantôme</Text>
						<Text>· Protection de l’oeuvre</Text>
					</Row>
				</Column>

				<Column flex={2} style={[Styles.navBarCol]}></Column>
			</Row>
			<Scrollable autoScrollToTop>
				<Row style={{ width: "100%", paddingTop: 10, paddingBottom: 60 }}>
					<Column flex={2} />
					<Column flex={8}>
						<Row style={Styles.rowAlignContent}>
							<Column flex={4}>
								<Heading level={2}>Certificat de paternité</Heading>
							</Column>
							<Column flex={4}>
								<Row style={{ justifyContent: "flex-end" }}>
									<Column>
										<Row>
											<TouchableWithoutFeedback>
												<View style={Styles.headerBtnIcon}>
													<Download />
												</View>
											</TouchableWithoutFeedback>
											<TouchableWithoutFeedback>
												<View
													style={[Styles.headerBtnIcon, Styles.headerButton]}
												>
													<SendIcon />
												</View>
											</TouchableWithoutFeedback>
											<Button
												style={Styles.headerButton}
												text="Protéger une nouvelle version"
											/>
										</Row>
									</Column>
								</Row>
							</Column>
						</Row>
						<Row style={Styles.rowAlignContent}>
							<Text small secondary>
								Mis à jour il y a 3 heures par{" "}
							</Text>
							<Text bold small action>
								Inscience
							</Text>
						</Row>
						<Row style={[Styles.boxContent1]}>
							<Column flex={6}>
								<Heading level={3}>Informations générales</Heading>
								<Column style={{ paddingTop: 12 }}>
									<Row>
										<Column flex={2}>
											<Text bold>Pièce musicale</Text>
										</Column>
										<Column flex={4}>
											<Text secondary>Derbie Tebbs - Fantôme</Text>
										</Column>
									</Row>
									<Row>
										<Column flex={2}>
											<Text bold>Déposée par</Text>
										</Column>
										<Column flex={4}>
											<Text secondary>Debbie Herbie Tebbs</Text>
											<Text secondary>18 avril 1981</Text>
											<Text secondary>debbietebbs@gmail.com</Text>
										</Column>
									</Row>
									<Row>
										<Column flex={2}>
											<Text bold>Date de dépôt</Text>
										</Column>
										<Column flex={4}>
											<Text secondary>7 Février 2019 à 12h34 UTC</Text>
										</Column>
									</Row>
								</Column>
							</Column>
							<Column flex={6} style={{ display: "block", textAlign: "end" }}>
								<CertificateImage />
							</Column>
						</Row>
						<Row style={Styles.boxContent2}>
							<Column flex={12}>
								<Heading level={3}>Versions publiées</Heading>
								{fileArr &&
									fileArr.map((f, index) => {
										return <LinkRow data={f} />
									})}
							</Column>
						</Row>
					</Column>
					<Column flex={2} />
				</Row>
			</Scrollable>
		</View>
	)
})
export default SummaryPage

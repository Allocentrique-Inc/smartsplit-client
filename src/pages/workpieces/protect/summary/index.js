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
import UserAvatar from "../../../../smartsplit/user/avatar"
import { useProtectModel } from "../../../../mobX/hooks"
import moment from "moment"
import CertificateModel from "../../../../mobX/models/workpieces/protect/CertificateModel"
import { useHistory } from "react-router"
import SendSoundImprintModal from "./sending-sound-imprint-modal"

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
	linkRow: { paddingTop: 56 },
	rowField: {
		paddingTop: 8,
	},
	fieldFiledByContent: { paddingTop: 8 },
})

const SummaryPage = observer((props) => {
	const { t } = useTranslation()
	const workpiece = useCurrentWorkpiece()
	const history = useHistory()
	const navigateToSummary = () => {
		history.push(`/workpieces/${workpiece.id}`)
	}
	const model: CertificateModel = useProtectModel(workpiece.id, "certificate")
	const user = model.listedBy.value
	let fieldTitleFlex = 2
	let fieldValueFlex = 4
	let certificateInfo = {
		user: user,
		lastUpdate: "01/22/2021 07:50 AM",
		NameWork: "Fantôme",
		musicalPiece: "Derbie Tebbs - Fantôme",
		listedBy: ["Willy Nilly", "18 avril 1981", "willy@iptoki.com"],
		updateBy: "Inscience",
		depositDate: "7 Février 2019 à 12h34 UTC",
		versions: [
			{
				title: "Fantôme ",
				postBy: "Inscience, Valaire, Robert Meuric",
				versionFlag: 1,
				sourceFile: "Fantome-Final-Master.wav",
				format: "WAV 44,1 kHz",
				registrationDate: "7 Février 2019 à 12h34 UTC",
				sha512:
					"0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
				md5: "d41d8cd98f00b204e9800998ecf8427e",
			},
			{
				title: "Fantôme v1",
				postBy: "Inscience, Valaire, Robert Meuric",
				versionFlag: 2,
				sourceFile: "Fantome_Mix_01.wav",
				format: "WAV 44,1 kHz",
				registrationDate: "23 mars 2018 à 01h32 UTC",
				sha512:
					"0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
				md5: "d41d8cd98f00b204e9800998ecf8427e",
			},
			{
				title: "Fantôme demo v3",
				postBy: "Inscience, Valaire, Robert Meuric",
				versionFlag: 3,
				sourceFile: "Fantome_Demo_v3.wav",
				transactionLinks:
					"https://etherscan.io/tx/0xef220429gdg4589798fd40fa6d46bf2d43467e088c",
				format: "WAV 44,1 kHz",
				registrationDate: "1 janvier 2018 à 12h34 UTC",
				sha512:
					"0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
				md5: "d41d8cd98f00b204e9800998ecf8427e",
			},
		],
	}
	const fileLength = certificateInfo.versions.length
	const clickArrowLeft = () => {
		navigateToSummary()
	}
	const [showSendModal, setShowSendModal] = useState(false)
	const clickProtectNewVersion = () => {
		history.push(`/workpieces/${workpiece.id}/protect/selection`)
	}

	return (
		<>
			<SendSoundImprintModal
				visible={showSendModal}
				onRequestClose={() => {
					setShowSendModal(false)
				}}
			/>
			<View style={{ height: "100%" }}>
				<Row style={{ width: "100%" }}>
					<Column flex={2} style={[Styles.navBarCol]}>
						<Row of="component" padding="component" valign="center">
							<TouchableWithoutFeedback onPress={clickArrowLeft}>
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
							<Text>· {t("protect:certificate.protectionWork")}</Text>
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
									<Heading level={2}>
										{t("protect:certificate.certificatePaternity")}
									</Heading>
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
												<TouchableWithoutFeedback
													onPress={() => {
														setShowSendModal(true)
													}}
												>
													<View
														style={[Styles.headerBtnIcon, Styles.headerButton]}
													>
														<SendIcon />
													</View>
												</TouchableWithoutFeedback>
												<Button
													style={Styles.headerButton}
													text={t("protect:certificate.protectNewVersion")}
													onClick={clickProtectNewVersion}
												/>
											</Row>
										</Column>
									</Row>
								</Column>
							</Row>
							<Row style={Styles.rowAlignContent}>
								<Text small secondary>
									{t("protect:certificate.uploadBy", {
										num: moment(certificateInfo.lastUpdate)
											.startOf("hour")
											.fromNow(),
									})}{" "}
								</Text>
								<Text bold small action>
									{certificateInfo.updateBy}
								</Text>
							</Row>
							<Row style={[Styles.boxContent1]}>
								<Column flex={6}>
									<Heading level={3}>
										{t("protect:certificate.generalInformations")}
									</Heading>
									<Column style={{ paddingTop: 12 }}>
										<Row style={Styles.rowField}>
											<Column flex={fieldTitleFlex}>
												<Text bold>
													{t("protect:certificate.musicalPiece")}
												</Text>
											</Column>
											<Column flex={fieldValueFlex}>
												<Row>
													<Column>
														<AlbumArt style={{ width: "90%", height: "90%" }} />
													</Column>
													<Column style={{ paddingLeft: 8 }}>
														<Text secondary>
															{certificateInfo.musicalPiece}
														</Text>
													</Column>
												</Row>
											</Column>
										</Row>
										<Row style={Styles.rowField}>
											<Column flex={fieldTitleFlex}>
												<Text bold>{t("protect:certificate.listedBy")}</Text>
											</Column>
											<Column flex={fieldValueFlex}>
												<Row style={Styles.fieldFiledByContent}>
													<Column>
														<UserAvatar user={user} size="small" />
													</Column>
													<Column style={{ paddingLeft: 5 }}>
														<Text
															secondary
														>{`${user.firstName} ${user.lastName}`}</Text>
													</Column>
												</Row>
												<Row style={Styles.fieldFiledByContent}>
													<Text secondary>
														{moment(user.birth).format("DD MMM yyyy")}
													</Text>
												</Row>
												<Row style={Styles.fieldFiledByContent}>
													<Text secondary>{user.email}</Text>
												</Row>
											</Column>
										</Row>
										<Row style={Styles.rowField}>
											<Column flex={fieldTitleFlex}>
												<Text bold>{t("protect:certificate.depositDate")}</Text>
											</Column>
											<Column flex={fieldValueFlex}>
												<Text secondary>{certificateInfo.depositDate}</Text>
											</Column>
										</Row>
									</Column>
								</Column>
								<Column
									flex={6}
									style={{ display: "flex", alignItems: "flex-end" }}
								>
									<CertificateImage />
								</Column>
							</Row>
							<Row style={Styles.boxContent2}>
								<Column flex={12}>
									<Heading level={3}>
										{t("protect:certificate.releasedVersions")}
									</Heading>
									{certificateInfo.versions &&
										certificateInfo.versions.map((f, index) => {
											const lastItem = index === fileLength - 1
											return (
												<LinkRow
													user={certificateInfo.user}
													style={Styles.linkRow}
													data={f}
													key={index}
													last={lastItem}
												/>
											)
										})}
								</Column>
							</Row>
						</Column>
						<Column flex={2} />
					</Row>
				</Scrollable>
			</View>
		</>
	)
})
export default SummaryPage

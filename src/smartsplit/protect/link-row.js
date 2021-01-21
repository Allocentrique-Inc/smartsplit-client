import { Column, Flex, Row } from "../../layout"
import React, { useState } from "react"
import LinkIcon from "../../svg/link-icon"
import { Heading, Text } from "../../text"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import ChevronDown from "../../svg/chevron-down"
import ChevronRight from "../../svg/chevron-right"
import QRCode from "react-native-qrcode-svg"
import ShowUserTag from "../user/ShowUserTag"
import CertificateModel from "../../mobX/models/workpieces/protect/CertificateModel"
import { useProtectModel } from "../../mobX/hooks"
import { useCurrentWorkpiece } from "../../pages/workpieces/context"
import UserAvatar from "../user/avatar"
import { useTranslation } from "react-i18next"

const Styles = StyleSheet.create({
	LinkRowTitle: {
		color: "#176D25",
		paddingBottom: 5,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 5,
		backgroundColor: "#DFF8E3",
		marginLeft: 20,
	},
	hairline: {
		height: "calc(100% - 0px)",
		width: 1,
		backgroundColor: "rgb(220, 223, 225)",
	},
	rowField: { paddingTop: 10 },
	transactionLinks: {
		textDecorationLine: "underline",
		borderStyle: "solid",
		borderWidth: 1,
		padding: 8,
		borderColor: "#DCDFE1",
	},
	copyLink: {
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#DCDFE1",
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 16,
		paddingRight: 16,
	},
})

export function LinkRow(props) {
	const { t } = useTranslation()
	const { data, last, user } = props
	const versionFlag = data.versionFlag
	const [isExpand1, setIsExpand1] = useState(false)
	const [isExpand2, setIsExpand2] = useState(false)

	return (
		<Row {...props}>
			<Column flex={2} style={{ alignItems: "center" }}>
				<View>
					<LinkIcon />
				</View>
				{!last && <View style={Styles.hairline} />}
			</Column>
			<Column flex={10}>
				<Row>
					<Column flex={10}>
						<Row>
							<Heading level={3}>{data.title}</Heading>
							<Text style={Styles.LinkRowTitle} bold>
								{versionFlag === 1
									? "Master"
									: versionFlag === 2
									? "Mix"
									: versionFlag === 3
									? "Idée"
									: ""}
							</Text>
						</Row>
						<Row>
							<Text secondary>Par Inscience, Valaire, Robert Meuric</Text>
						</Row>
						<Row>
							<Column flex={10}>
								<View style={{ paddingTop: 20 }}>
									<TouchableWithoutFeedback
										onPress={() => {
											if (isExpand1) {
												setIsExpand1(false)
											} else {
												setIsExpand1(true)
											}
										}}
									>
										<Row>
											<Text action bold style={{ paddingRight: 10 }}>
												{t("protect:certificate.seePermalink")}
											</Text>
											{isExpand1 && <ChevronDown color={"rgb(45, 168, 79)"} />}
											{!isExpand1 && (
												<ChevronRight color={"rgb(45, 168, 79)"} />
											)}
										</Row>
									</TouchableWithoutFeedback>
									{isExpand1 && data.versionFlag === 3 && (
										<Row style={Styles.rowField}>
											<Column flex={7}>
												<Text small secondary>
													Ce lien ci-dessous et le code QR à droite mènent vers
													la transaction sur la blockchain comportant les
													empreintes numériques du fichier, le nom et les
													données personnelles encryptées de son déposant, le
													moment précis du dépôt, ainsi que quelques métadonnées
													descriptives complémentaires.
												</Text>
											</Column>
											<Column flex={3} style={{ alignItems: "flex-end" }}>
												<QRCode value={data.transactionLinks} />
											</Column>
										</Row>
									)}
									{isExpand1 && data.versionFlag === 3 && (
										<Row style={Styles.rowField}>
											<Column flex={7} style={Styles.transactionLinks}>
												<Text>{data.transactionLinks}</Text>
											</Column>
											<Column flex={3} style={{ marginLeft: 16 }}>
												<View>
													<TouchableWithoutFeedback>
														<Text
															style={Styles.copyLink}
															action
															bold
															align="center"
														>
															Copier le lien
														</Text>
													</TouchableWithoutFeedback>
												</View>
											</Column>
										</Row>
									)}
									{isExpand1 && (
										<Row style={{ paddingTop: 25 }}>
											<Column flex={10}>
												<Row>
													<Column flex={3}>
														<Text bold>Fichier source</Text>
													</Column>
													<Column flex={7}>
														<Text secondary>Fantome-Final-Master.wav</Text>
													</Column>
												</Row>
												<Row style={Styles.rowField}>
													<Column flex={3}>
														<Text bold>Format</Text>
													</Column>
													<Column flex={7}>
														<Text secondary>WAV 44,1 kHz</Text>
													</Column>
												</Row>
												<Row style={Styles.rowField}>
													<Column flex={3}>
														<Text bold>Version de travail</Text>
													</Column>
													<Column flex={7}>
														<Text secondary>Master</Text>
													</Column>
												</Row>
												<Row style={Styles.rowField}>
													<Column flex={3}>
														<Text bold>Inscrite par</Text>
													</Column>
													<Column flex={7}>
														<Row>
															<Column>
																<UserAvatar user={user} size="small" />
															</Column>
															<Column
																style={{
																	justifyContent: "center",
																	paddingLeft: 5,
																}}
															>
																<Text secondary>Debbie Herbie Tebbs</Text>
															</Column>
														</Row>
													</Column>
												</Row>
												<Row style={Styles.rowField}>
													<Column flex={3}>
														<Text bold>Date d’inscription</Text>
													</Column>
													<Column flex={7}>
														<Text secondary>7 Février 2019 à 12h34 UTC</Text>
													</Column>
												</Row>
											</Column>
										</Row>
									)}
									<View style={{ paddingTop: 25 }}>
										<TouchableWithoutFeedback
											onPress={() => {
												if (isExpand2) {
													setIsExpand2(false)
												} else {
													setIsExpand2(true)
												}
											}}
										>
											<Row>
												<Text action bold style={{ paddingRight: 10 }}>
													Voir les empreintes numériques
												</Text>
												{isExpand2 && (
													<ChevronDown color={"rgb(45, 168, 79)"} />
												)}
												{!isExpand2 && (
													<ChevronRight color={"rgb(45, 168, 79)"} />
												)}
											</Row>
										</TouchableWithoutFeedback>
									</View>
									{isExpand2 && (
										<Row style={{ paddingTop: 25 }}>
											<Column flex={10}>
												<Row>
													<Column flex={3}>
														<Text bold>SHA512</Text>
													</Column>
													<Column flex={7}>
														<Text secondary>
															0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
														</Text>
													</Column>
												</Row>
												<Row style={Styles.rowField}>
													<Column flex={3}>
														<Text bold>MD5</Text>
													</Column>
													<Column flex={7}>
														<Text secondary>
															d41d8cd98f00b204e9800998ecf8427e
														</Text>
													</Column>
												</Row>
											</Column>
										</Row>
									)}
								</View>
							</Column>
						</Row>
					</Column>
				</Row>
			</Column>
		</Row>
	)
}

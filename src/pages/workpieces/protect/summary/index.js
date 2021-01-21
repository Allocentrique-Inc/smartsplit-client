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
	const model: CertificateModel = useProtectModel(workpiece.id, "certificate")
	const user = model.listedBy.value
	let fieldTitle = 2
	let fieldValue = 4
	const certificateInfo = {
		lastUpdate: new Date(2021, 1, 21, 14, 50, 0, 0),
	}
	console.log("from now", toJS(moment(certificateInfo.lastUpdate)))
	const [fileArr, setFileArr] = useState([
		{
			title: "Fantôme ",
			versionFlag: 1,
		},
		{
			title: "Fantôme v1",
			versionFlag: 2,
		},
		{
			title: "Fantôme demo v3",
			versionFlag: 3,
			transactionLinks:
				"https://etherscan.io/tx/0xef220429gdg4589798fd40fa6d46bf2d43467e088c",
		},
	])
	const fileLength = fileArr.length

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
											<TouchableWithoutFeedback>
												<View
													style={[Styles.headerBtnIcon, Styles.headerButton]}
												>
													<SendIcon />
												</View>
											</TouchableWithoutFeedback>
											<Button
												style={Styles.headerButton}
												text={t("protect:certificate.protectNewVersion")}
											/>
										</Row>
									</Column>
								</Row>
							</Column>
						</Row>
						<Row style={Styles.rowAlignContent}>
							<Text small secondary>
								{t("protect:certificate.uploadBy", { num: 3 })}{" "}
							</Text>
							<Text bold small action>
								{user.firstName}
							</Text>
						</Row>
						<Row style={[Styles.boxContent1]}>
							<Column flex={6}>
								<Heading level={3}>
									{t("protect:certificate.generalInformations")}
								</Heading>
								<Column style={{ paddingTop: 12 }}>
									<Row style={Styles.rowField}>
										<Column flex={fieldTitle}>
											<Text bold>{t("protect:certificate.musicalPiece")}</Text>
										</Column>
										<Column flex={fieldValue}>
											<Text secondary>Derbie Tebbs - Fantôme</Text>
										</Column>
									</Row>
									<Row style={Styles.rowField}>
										<Column flex={fieldTitle}>
											<Text bold>{t("protect:certificate.listedBy")}</Text>
										</Column>
										<Column flex={fieldValue}>
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
												<Text secondary>18 avril 1981</Text>
											</Row>
											<Row style={Styles.fieldFiledByContent}>
												<Text secondary>{user.email}</Text>
											</Row>
										</Column>
									</Row>
									<Row style={Styles.rowField}>
										<Column flex={fieldTitle}>
											<Text bold>{t("protect:certificate.depositDate")}</Text>
										</Column>
										<Column flex={fieldValue}>
											<Text secondary>7 Février 2019 à 12h34 UTC</Text>
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
								{fileArr &&
									fileArr.map((f, index) => {
										const lastItem = index === fileLength - 1
										return (
											<LinkRow
												user={user}
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
	)
})
export default SummaryPage

import { observer } from "mobx-react"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Column, Flex, Hairline, NoSpacer, Row } from "../../../layout"
import CertificateModel from "../../../mobX/models/workpieces/protect/CertificateModel"
import AddBirthModal from "../../../smartsplit/user/AddBirthModal"
import ShowUserTag from "../../../smartsplit/user/ShowUserTag"
import { Heading, Paragraph, Text } from "../../../text"
import QuestionIcon from "../../../svg/help-circle-full"
import DependanceRow from "../../../smartsplit/protect/dependance-row"
import { Colors, Metrics } from "../../../theme"
import LockSVG from "../../../svg/lock-svg"
import AddPlaceBirthModal from "../../../smartsplit/user/AddPlaceBirthModal"
import CompleteIdentityModal from "./complete-identity-modal"

const Styles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	checkbox: {
		paddingLeft: Metrics.spacing.small,
	},
	fieldContent: {
		fontWeight: "bold",
		flex: 7,
	},
	flexDirectionRow: {
		flexDirection: "row",
	},
	rowTouchable: {
		backgroundColor: Colors.background.underground,
	},
	iconLock: { alignItems: "center", flex: 5 },
	touchable: { paddingTop: 8 },
})

const CertificatePage = observer((props) => {
	const { t } = useTranslation()
	const model: CertificateModel = props.model
	const user = model.listedBy.value
	const addictions = model.addictions.array
	const itemsCount = addictions.length
	const oneItem = itemsCount === 1
	const workpiece = props.workpiece
	const [identityModalVisible, setIdentityModalVisible] = useState(false)
	const [isCompleteIdentity, setCompleteId] = useState(
		(user.birth != null || user.birth != undefined) &&
			user.birth != "" &&
			(user.email != null || user.email !== undefined) &&
			user.email != ""
	)

	const handleEditEdentity = () => {
		setIdentityModalVisible(true)
	}

	const handleIdentityModalClose = (val) => {
		setCompleteId(val)
		setIdentityModalVisible(false)
	}
	return (
		<>
			<CompleteIdentityModal
				visible={identityModalVisible}
				onRequestClose={handleIdentityModalClose}
				model={model}
				workpieceId={workpiece.id}
			/>
			<Row>
				<Column of="group" flex={7}>
					<Column of="section" flex={7}>
						<Column of="component">
							<Heading level={1}>{t("protect:certificate:heading1")}</Heading>
							<Text secondary>{t("protect:certificate:para1")}</Text>
						</Column>
						<Column of="component">
							<Heading level={3}>
								{t("protect:certificate:musicalPiece")}
							</Heading>
							<Row>
								<Column flex={5}>
									<Text bold>{t("protect:certificate:sourceFile")}</Text>
								</Column>
								<Column flex={7}>
									<Text secondary>{model.sourceFile.value}</Text>
								</Column>
							</Row>
							<Row>
								<Column flex={5}>
									<Text bold>{t("protect:certificate:format")}</Text>
								</Column>
								<Column flex={7}>
									<Text secondary>{model.format.value}</Text>
								</Column>
							</Row>
							<Row>
								<Column flex={5}>
									<Text bold>{t("protect:certificate:versionName")}</Text>
								</Column>
								<Column flex={7}>
									<Text secondary>{model.versionName.value}</Text>
								</Column>
							</Row>
							<Row>
								<Column flex={5}>
									<Text bold>{t("protect:certificate:category")}</Text>
								</Column>
								<Column flex={7}>
									<Text secondary>{model.category}</Text>
								</Column>
							</Row>
							<Row>
								<Column flex={5}>
									<Text bold>{t("protect:certificate:workingVersion")}</Text>
								</Column>
								<Column flex={7}>
									<Text secondary>{model.workingVersion.value}</Text>
								</Column>
							</Row>
							<Row>
								<Column flex={5}>
									<Text bold>{t("protect:certificate:listedBy")}</Text>
								</Column>
								<Column flex={7}>
									<Row>
										<ShowUserTag user={user} key={user.user_id} />
									</Row>
								</Column>
							</Row>
							<Row>
								<Column flex={5}>
									<Text bold>{t("protect:certificate:identity")}</Text>
								</Column>
								<Column flex={7}>
									{!isCompleteIdentity && (
										<TouchableWithoutFeedback onPress={handleEditEdentity}>
											<Text action bold>
												{t("protect:certificate:completeIdentity")}
											</Text>
										</TouchableWithoutFeedback>
									)}
									{isCompleteIdentity && (
										<Row>
											<Column>
												<Text secondary>{t("protect:completed")} . </Text>
											</Column>
											<Column>
												<TouchableWithoutFeedback onPress={handleEditEdentity}>
													<Text action bold>
														{t("protect:certificate.edit")}
													</Text>
												</TouchableWithoutFeedback>
											</Column>
										</Row>
									)}
								</Column>
							</Row>
						</Column>
						<Hairline />
						<Column of="component">
							<Heading level={3}>{t("protect:certificate:addiction")}</Heading>
							{addictions &&
								addictions.map((d, index) => {
									const first = index === 0 && !oneItem
									const last = index === itemsCount - 1 && !oneItem

									return (
										<NoSpacer key={d.id}>
											<DependanceRow
												data={d}
												first={first}
												last={last}
												oneItem={oneItem}
											/>
										</NoSpacer>
									)
								})}
						</Column>
						{/* <Hairline />
						<Column of="component">
							<Heading level={3}>
								{t("protect:certificate:fileDigitalFingerprints")}
							</Heading>
							<Row>
								<Column flex={5} style={Styles.flexDirectionRow}>
									<Text bold>{t("protect:certificate:sha256")}</Text>
									<QuestionIcon size={Metrics.size.medium / 2} />
								</Column>
								<Column flex={7}>
									<Text secondary>{model.sha256.value}</Text>
								</Column>
							</Row>
							<Row>
								<Column flex={5} style={Styles.flexDirectionRow}>
									<Text bold>{t("protect:certificate:md5")}</Text>
									<QuestionIcon size={Metrics.size.medium / 2} />
								</Column>
								<Column flex={7}>
									<Text secondary>{model.md5.value}</Text>
								</Column>
							</Row>
						</Column> */}
					</Column>
				</Column>
				<Flex />
				<Column of="group" flex={5}>
					<Column of="component" padding="component" layer="underground">
						<Column of="inside">
							<Text small bold tertiary>
								{t("protect:help")}
							</Text>
							<Hairline />
						</Column>
						<Heading level={4}>{t("protect:certificate.why")}</Heading>
						<Text
							dangerouslySetInnerHTML={{
								__html: t("protect:certificate.whyContent"),
							}}
							secondary
						/>
					</Column>
				</Column>
			</Row>
		</>
	)
})
export default CertificatePage

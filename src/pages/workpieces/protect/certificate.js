import React, { useState } from "react"
import { useHistory, useParams } from "react-router"
import { useTranslation } from "react-i18next"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { useCurrentWorkpiece } from "../context"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline, NoSpacer, Group } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Metrics } from "../../../theme"
import { observer } from "mobx-react"
import CertificateModel from "../../../mobX/models/workpieces/protect/CertificateModel"
import { useProtectModel } from "../../../mobX/hooks"
import ShowUserTag from "../../../smartsplit/user/ShowUserTag"
import AddBirthModal from "../../../smartsplit/user/AddBirthModal"
import { DialogModal } from "../../../widgets/modal"
import HighFive from "../../../../assets/svg/high-five.svg"
import QuestionIcon from "../../../svg/help-circle-full"
import { CheckBoxGroup, CheckBoxGroupButton } from "../../../forms/checkbox"
import DependanceRow from "../../../smartsplit/protect/dependance-row"

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
})

export default observer(function Certificate(props) {
	const workpiece = useCurrentWorkpiece()
	const workpieceId = workpiece.id
	const model: CertificateModel = useProtectModel(workpieceId, "certificate")
	const { modalVisible, closeModal } = props
	return (
		<>
			<CertificatePage model={model}></CertificatePage>
			<VerifyModal
				model={model}
				visible={modalVisible}
				onRequestClose={closeModal}
			></VerifyModal>
		</>
	)
})

const CertificatePage = observer((props) => {
	const { t } = useTranslation()
	const workpiece = useCurrentWorkpiece()
	const workpieceId = workpiece.id
	const model: CertificateModel = useProtectModel(workpieceId, "certificate")
	const [modalVisible, setModalVisible] = useState(false)
	const user = model.listedBy.value
	const addictions = model.addictions.array
	const itemsCount = addictions.length
	const oneItem = itemsCount === 1

	return (
		<>
			<AddBirthModal
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false)
				}}
			/>
			<Row>
				<Column of="group" flex={7}>
					<Column of="section" flex={7}>
						<Column of="component">
							<Heading level={1}>{t("protect:certificate:heading1")}</Heading>
							<Paragraph>{t("protect:certificate:para1")}</Paragraph>
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
									<Row style={{ marginTop: "20px" }}>
										<TouchableWithoutFeedback
											onPress={() => {
												setModalVisible(true)
											}}
										>
											<Text action bold>
												{t("protect:certificate:addBirth")}
											</Text>
										</TouchableWithoutFeedback>
									</Row>
								</Column>
							</Row>
						</Column>
						<Hairline />
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
						<Text secondary>{t("protect:certificate.whyContent")}</Text>
					</Column>
				</Column>
			</Row>
		</>
	)
})

export function VerifyModal(props) {
	const { t } = useTranslation()
	function navigateToSummary() {
		history.push(`/workpieces/${workpiece_id}`)
	}
	const model: CertificateModel = props.model
	const [selection, setSelection] = useState([])
	const [isEnoughSelect, setIsEnoughSelect] = useState(false)

	const handleSelection = (val) => {
		setSelection(val)
		if (val.length === 3) setIsEnoughSelect(true)
		else setIsEnoughSelect(false)
	}

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("protect:beforePosting")}
			buttons={
				<>
					<Button
						tertiary
						text={t("general:buttons.cancel")}
						onClick={props.onRequestClose}
					></Button>
					<Button
						disabled={!isEnoughSelect}
						text={t("protect:publishOnBlockchain")}
						onClick={navigateToSummary}
						/* 						onClick={() => {
					console.log(t("document:finalModal.title"))
				}} */
					/>
				</>
			}
		>
			<Group of="group" style={{ maxWidth: 560 }}>
				<CheckBoxGroup selection={selection} onChange={handleSelection} error>
					<Row>
						<Column flex={1}>
							<CheckBoxGroupButton value="1" />
						</Column>
						<Column flex={11}>
							<Text
								style={Styles.checkbox}
								dangerouslySetInnerHTML={{
									__html: t("protect:verify1", { firstName: model.firstName }),
								}}
							/>
						</Column>
					</Row>

					<Row>
						<Column flex={1}>
							<CheckBoxGroupButton value="2" />
						</Column>
						<Column flex={11}>
							<Text
								style={Styles.checkbox}
								dangerouslySetInnerHTML={{
									__html: t("protect:verify2", { firstName: model.firstName }),
								}}
							/>
						</Column>
					</Row>
					<Row>
						<Column flex={1}>
							<CheckBoxGroupButton value="3" />
						</Column>
						<Column flex={11}>
							<Text
								style={Styles.checkbox}
								dangerouslySetInnerHTML={{
									__html: t("protect:verify3", { firstName: model.firstName }),
								}}
							/>
						</Column>
					</Row>
				</CheckBoxGroup>
			</Group>
		</DialogModal>
	)
}

export function EndModal(props) {
	const { t } = useTranslation()
	const history = useHistory()
	const { workpiece_id } = useParams()
	const workpiece = useCurrentWorkpiece()
	function navigateToSummary() {
		history.push(`/workpieces/${workpiece_id}`)
	}

	return (
		<DialogModal
			visible={props.visible}
			onRequestClose={props.onRequestClose}
			title={t("document:finalModal.header")}
			buttons={
				<>
					<Button
						text={t("general:buttons.seeSummary")}
						onClick={navigateToSummary}
						/* 						onClick={() => {
					console.log(t("document:finalModal.title"))
				}} */
					/>
				</>
			}
		>
			<Group
				of="group"
				style={{ maxWidth: 560, alignSelf: "center", textAlign: "center" }}
			>
				<View style={{ alignItems: "center" }}>
					<HighFive />
				</View>
				<Heading level={4}>
					{t("document:finalModal.title", { workpiece: workpiece.data.title })}
				</Heading>
				<Paragraph>{t("document:finalModal.paragraph")}</Paragraph>
			</Group>
		</DialogModal>
	)
}

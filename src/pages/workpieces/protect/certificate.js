import React, { useState } from "react"
import { useHistory, useParams } from "react-router"
import { useTranslation } from "react-i18next"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { useCurrentWorkpiece } from "../context"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline, NoSpacer, Group } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import { observer } from "mobx-react"
import { CardStyles } from "../../../widgets/card"
import CertificateModel from "../../../mobX/models/workpieces/protect/CertificateModel"
import { useProtectModel } from "../../../mobX/hooks"
import ShowUserTag from "../../../smartsplit/user/ShowUserTag"
import AddBirthModal from "../../../smartsplit/user/AddBirthModal"
import { DialogModal } from "../../../widgets/modal"
import HighFive from "../../../../assets/svg/high-five.svg"
import { CheckBoxGroup, CheckBoxGroupButton } from "../../../forms/checkbox"
import DependanceRow from "../../../smartsplit/protect/dependance-row"

const Styles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	logo: {
		marginRight: Metrics.spacing.component,
	},
	frame: {
		backgroundColor: Colors.background.underground,
	},
	frame_error: {
		borderWidth: 1,
		borderColor: Colors.error,
		borderStyle: "solid",
	},
	frame_yourself: {
		borderWidth: 1,
		borderColor: Colors.secondaries.teal,
	},
})

const frameStyle = [CardStyles.frame, Styles.frame]

export default observer(function Certificate(props) {
	const { modalVisible, closeModal } = props
	return (
		<>
			<CertificatePage></CertificatePage>
			<NextModal visible={modalVisible} onRequestClose={closeModal}></NextModal>
		</>
	)
})

const CertificatePage = observer((props) => {
	const { t } = useTranslation()
	const workpiece = useCurrentWorkpiece()
	const workpieceId = workpiece.id
	const model: CertificateModel = useProtectModel(workpieceId, "certificate")
	const [authors, setAuthors] = useState([
		{
			user_id: "09a082f1-41a7-4e09-8ee3-e5e0fdad8bbb",
			firstName: "Willy",
			lastName: "Nilly",
			artistName: "Willy the Poo",
			avatarUrl:
				"https://apiv2-dev.smartsplit.org/v1/users/09a082f1-41a7-4e09-8ee3-e5e0fdad8bbb/avatar",
		},
	])
	const [modalVisible, setModalVisible] = useState(false)
	const [addictions, setAddictions] = useState([
		{
			id: 1,
			status: 0,
			name: "Valaire - Fantome v2 mixdown.wav",
			time: new Date(),
			author: "Inscience",
			tag: "Demo",
		},
		{
			id: 2,
			status: 1,
			name: "Valaire - Fantome v1.wav",
			time: new Date(2020, 11, 10),
			author: "Inscience",
			tag: "Mix",
		},
		{
			id: 3,
			status: 1,
			name: "Valaire - Fantome v1.wav",
			time: new Date(2020, 11, 8),
			author: "Inscience",
			tag: "Mix",
		},
	])

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
									<Text bold style={{ flex: 7 }}>
										{t("protect:certificate:sourceFile")}
									</Text>
								</Column>
								<Column flex={7}>
									<Text secondary style={{ flex: 9 }}>
										{model.format.sourceFile}
									</Text>
								</Column>
							</Row>
							<Row>
								<Column flex={5}>
									<Text bold style={{ flex: 7 }}>
										{t("protect:certificate:format")}
									</Text>
								</Column>
								<Column flex={7}>
									<Text secondary style={{ flex: 9 }}>
										{model.format.value}
									</Text>
								</Column>
							</Row>
							<Row>
								<Column flex={5}>
									<Text bold style={{ flex: 7 }}>
										{t("protect:certificate:versionName")}
									</Text>
								</Column>
								<Column flex={7}>
									<Text secondary style={{ flex: 9 }}>
										{model.versionName.value}
									</Text>
								</Column>
							</Row>
							<Row>
								<Column flex={5}>
									<Text bold style={{ flex: 7 }}>
										{t("protect:certificate:workingVersion")}
									</Text>
								</Column>
								<Column flex={7}>
									<Text secondary style={{ flex: 9 }}>
										{model.workingVersion.value}
									</Text>
								</Column>
							</Row>
							<Row>
								<Column flex={5}>
									<Text bold style={{ flex: 7 }}>
										{t("protect:certificate:listedBy")}
									</Text>
								</Column>
								<Column flex={7}>
									<Row>
										{authors.map((user) => (
											<ShowUserTag
												user={user}
												field={authors}
												key={user.user_id}
											/>
										))}
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
								<Text bold style={{ flex: 7 }}>
									{t("protect:certificate:sha256")}
								</Text>
								<Text secondary style={{ flex: 9 }}>
									{model.sha256.value}
								</Text>
							</Row>
							<Row>
								<Text bold style={{ flex: 7 }}>
									{t("protect:certificate:md5")}
								</Text>
								<Text secondary style={{ flex: 9 }}>
									{model.md5.value}
								</Text>
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

export function NextModal(props) {
	const { t } = useTranslation()
	function navigateToSummary() {
		history.push(`/workpieces/${workpiece_id}`)
	}
	return (
		<>
			<DialogModal
				visible={props.visible}
				onRequestClose={props.onRequestClose}
				title={t("protect:beforePosting")}
				buttons={
					<>
						<Button tertiary text={t("general:buttons.cancel")}></Button>
						<Button
							text={t("protect:publishOnBlockchain")}
							//onClick={navigateToSummary}
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
					<CheckBoxGroup
						field="{model.defaultRoles}"
						label={t("forms:labels.defaultRoles")}
						undertext={t("forms:undertexts.defaultRoles")}
					>
						<CheckBoxGroupButton
							value="xzczxc"
							key="{role.value}"
							label="{role.label}"
						/>
						<CheckBoxGroupButton
							value="{role.value}"
							key="{role.value}"
							label="{role.label}"
						/>
						<CheckBoxGroupButton
							value="{role.value}"
							key="{role.value}"
							label="{role.label}"
						/>
						<CheckBoxGroupButton
							value="{role.value}"
							key="{role.value}"
							label="{role.label}"
						/>
					</CheckBoxGroup>
				</Group>
			</DialogModal>
		</>
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

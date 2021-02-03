import { observer } from "mobx-react"
import React, { useState } from "react"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Column, Flex, Row } from "../../../layout"
import AlbumArt from "../../../smartsplit/media/albumArt"
import { Heading, Text } from "../../../text"
import Scrollable from "../../../widgets/scrollable"
import ArrowLeft from "../../../svg/arrow-left"
import { useHistory } from "react-router"
import { useTranslation } from "react-i18next"
import { useCurrentWorkpiece } from "../context"
import moment from "moment"
import { Tab, TabBar } from "../../../widgets/tabs"
import EmptyState from "../../../svg/empty-state"
import Button from "../../../widgets/button"
import DragDropItem from "./dragdrop-item"
import CollaboratorModal from "./modal/collaborators-modal"
import SendCollaboratorsModal from "./modal/send-collaborators-modal"
import SensitiveInfoModal from "./modal/modal-sensitive-info"

const Styles = StyleSheet.create({
	navBarCol: {
		borderBottomColor: "#DCDFE1",
		borderBottomWidth: 2,
	},
	taskBar: {
		paddingTop: 32,
		width: "100%",
	},
	emptyStateIcon: {
		alignItems: "center",
	},
	emptyStateView: {
		paddingTop: 90,
		alignItems: "center",
	},
})

export const shareInfo = {
	updateBy: "Inscience",
	lastUpdate: "01/22/2021 07:50 AM",
	columns: {
		waitingToSend: [
			{
				version: "1",
				updateBy: "ArtistName",
				lastUpdate: "01/27/2021 12:00",
				userUrls: [
					"https://apiv2-dev.smartsplit.org/v1/users/09a082f1-41a7-4e09-8ee3-e5e0fdad8bbb/avatar",
					"",
					"",
				],
				copyright: [
					{
						url: "",
						name: "Inscience (toi)",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 1,
					},
					{
						uri: "",
						name: "Erykah Badu",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "J-Zone",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Quest Love",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Ringo Starr",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
				],
				interpretation: [
					{
						uri: "",
						name: "Inscience (toi)",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 1,
					},
					{
						uri: "",
						name: "Erykah Badu",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "J-Zone",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Quest Love",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Ringo Starr",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
				],
				soundRecording: [
					{
						uri: "",
						name: "Inscience (toi)",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 1,
					},
					{
						uri: "",
						name: "Erykah Badu",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "J-Zone",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Quest Love",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Ringo Starr",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
				],
				confidentiality: {
					access: 1,
					userAccess: [
						{
							url: "",
							name: "Inscience (toi)",
							status: 2,
						},
						{
							url: "",
							name: "Quest Love",
							status: 1,
						},
						{
							url: "",
							name: "Sunday Sauce Records",
							status: 3,
						},
						{
							url: "",
							name: "J-Zone",
							status: 2,
							note: "abc",
						},
					],
				},
			},
			{
				version: "2",
				updateBy: "ArtistName2",
				lastUpdate: "01/25/2021 17:03",
				userUrls: [
					"",
					"https://apiv2-dev.smartsplit.org/v1/users/09a082f1-41a7-4e09-8ee3-e5e0fdad8bbb/avatar",
					"",
				],
				copyright: [
					{
						url: "",
						name: "Inscience (toi)",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 1,
					},
					{
						uri: "",
						name: "Erykah Badu",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "J-Zone",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Quest Love",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Ringo Starr",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
				],
				interpretation: [
					{
						uri: "",
						name: "Inscience (toi)",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 1,
					},
					{
						uri: "",
						name: "Erykah Badu",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "J-Zone",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Quest Love",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Ringo Starr",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
				],
				soundRecording: [
					{
						uri: "",
						name: "Inscience (toi)",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 1,
					},
					{
						uri: "",
						name: "Erykah Badu",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "J-Zone",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Quest Love",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Ringo Starr",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
				],
				confidentiality: {
					access: 1,
					userAccess: [
						{
							url: "",
							name: "Inscience (toi)",
							status: 2,
						},
						{
							url: "",
							name: "Quest Love",
							status: 1,
						},
						{
							url: "",
							name: "Sunday Sauce Records",
							status: 3,
						},
						{
							url: "",
							name: "J-Zone",
							status: 2,
							note: "abc",
						},
					],
				},
			},
			{
				version: "3",
				updateBy: "ArtistName3",
				lastUpdate: "01/25/2021 17:03",
				userUrls: [
					"https://apiv2-dev.smartsplit.org/v1/users/09a082f1-41a7-4e09-8ee3-e5e0fdad8bbb/avatar",
					"",
					"",
				],
				copyright: [
					{
						url: "",
						name: "Inscience (toi)",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 1,
					},
					{
						uri: "",
						name: "Erykah Badu",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "J-Zone",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Quest Love",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Ringo Starr",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
				],
				interpretation: [
					{
						uri: "",
						name: "Inscience (toi)",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 1,
					},
					{
						uri: "",
						name: "Erykah Badu",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "J-Zone",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Quest Love",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Ringo Starr",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
				],
				soundRecording: [
					{
						uri: "",
						name: "Inscience (toi)",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 1,
					},
					{
						uri: "",
						name: "Erykah Badu",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "J-Zone",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Quest Love",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
					{
						uri: "",
						name: "Ringo Starr",
						role: "Auteur, Compositeur, Arrangeur",
						percent: "88,8",
						status: 2,
					},
				],
				confidentiality: {
					access: 1,
					userAccess: [
						{
							url: "",
							name: "Inscience (toi)",
							status: 2,
						},
						{
							url: "",
							name: "Quest Love",
							status: 1,
						},
						{
							url: "",
							name: "Sunday Sauce Records",
							status: 3,
						},
						{
							url: "",
							name: "J-Zone",
							status: 2,
							note: "abc",
						},
					],
				},
			},
		],
		awaitingDecision: [],
		decided: [],
	},
}
const sensitiveInfo = [
	{
		url: "",
		nameOfWork: "Inscience (toi)",
		roles: "Auteur, Compositeur, Arrangeur",
		usualFirstNames: "Joel",
		usualName: "Lamour",
		dateOfBirth: "01/01/1992",
		ipi: "",
		streetAddress: "285 rue Lac-Long",
		email: "questlove@theroots.com",
	},
	{
		url: "",
		nameOfWork: "Quest Love",
		roles: "Auteur, Compositeur, Arrangeur",
		usualFirstNames: "Joel",
		usualName: "Lamour",
		dateOfBirth: "01/01/1992",
		ipi: "",
		streetAddress: "285 rue Lac-Long",
		email: "questlove@theroots.com",
	},
	{
		url: "",
		nameOfWork: "Georges Benson",
		roles: "Auteur, Compositeur, Arrangeur",
		usualFirstNames: "Joel",
		usualName: "Lamour",
		dateOfBirth: "01/01/1992",
		ipi: "",
		streetAddress: "285 rue Lac-Long",
		email: "questlove@theroots.com",
	},
]

const SummaryProtectionWorkPage = observer(() => {
	const history = useHistory()
	const { t } = useTranslation()
	const workpiece = useCurrentWorkpiece()
	const navigateToSummary = () => {
		history.push(`/workpieces/${workpiece.id}`)
	}

	const [isEmpty, setIsEmpty] = useState(shareInfo.columns ? false : true)
	const [isCollaboratorVisible, SetCollaboratorVisible] = useState(false)
	const [sendModalVisible, setSendModalVisible] = useState(false)
	const [dataCollaborator, setDataCollaborator] = useState({})
	const [showModalSensitive, setShowModalSensitive] = useState(false)

	const clickArrowLeft = () => {
		navigateToSummary()
	}

	const handleCollaboratorClose = (isClickSend) => {
		if (isClickSend) {
			setSendModalVisible(true)
		}
		SetCollaboratorVisible(false)
		setDataCollaborator({})
	}

	const handleOnClickSend = (item) => {
		setDataCollaborator(item)
		SetCollaboratorVisible(true)
	}

	const handleOnSendModalClosed = () => {
		setSendModalVisible(false)
	}

	const handleShowSensitiveInfo = () => {
		setShowModalSensitive(!showModalSensitive)
	}

	return (
		<>
			<CollaboratorModal
				data={dataCollaborator}
				visible={isCollaboratorVisible}
				onRequestClose={handleCollaboratorClose}
			/>
			<SendCollaboratorsModal
				visible={sendModalVisible}
				onRequestClose={handleOnSendModalClosed}
			/>
			<SensitiveInfoModal
				data={sensitiveInfo}
				visible={showModalSensitive}
				onRequestClose={handleShowSensitiveInfo}
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
							<Text>· {t("shareYourRights:sharingRights")}</Text>
						</Row>
					</Column>
					<Column flex={2} style={[Styles.navBarCol]} />
				</Row>
				<Scrollable>
					<Row style={{ width: "100%", paddingTop: 32, paddingBottom: 60 }}>
						<Column flex={2} />
						<Column flex={8}>
							<Row>
								<Heading level={2}>
									{t("shareYourRights:summarySharing")}
								</Heading>
							</Row>
							<Row>
								<Text
									small
									secondary
									dangerouslySetInnerHTML={{
										__html: t("shareYourRights:updateBy", {
											name: shareInfo.updateBy,
											hour: moment(shareInfo.lastUpdate)
												.startOf("hour")
												.fromNow(),
										}),
									}}
								/>
							</Row>
							<Row>
								<TabBar style={Styles.taskBar}>
									<Tab
										key="my-collaborators"
										title={t("shareYourRights:tabBar.myCollaborators.title")}
										default
										bold
									>
										{isEmpty && <EmptyStateView />}
										{!isEmpty && (
											<DragDropItem
												onClickSend={handleOnClickSend}
												columns={shareInfo.columns}
											/>
										)}
									</Tab>
									<Tab
										key="my-editor"
										title={t("shareYourRights:tabBar.myEditor.title")}
										bold
									>
										<EmptyStateView />
									</Tab>
									<Tab
										key="my-manager"
										title={t("shareYourRights:tabBar.myManager.title")}
										bold
									>
										<EmptyStateView />
									</Tab>
								</TabBar>
							</Row>
							<Row>
								<Button
									text="Modal Sensitive Info"
									onClick={handleShowSensitiveInfo}
									small
								/>
							</Row>
						</Column>
						<Column flex={2} />
					</Row>
				</Scrollable>
			</View>
		</>
	)
})

export function EmptyStateView(props) {
	const { t } = useTranslation()
	return (
		<Column style={Styles.emptyStateView}>
			<View style={Styles.emptyStateIcon}>
				<EmptyState />
			</View>
			<Text align="center" bold style={{ paddingTop: 50 }}>
				{t("shareYourRights:tabBar.myEditor.why")}
			</Text>
			<Text align="center" secondary style={{ paddingTop: 8 }}>
				{t("shareYourRights:tabBar.myEditor.whyContent")}
			</Text>

			<Button
				style={{ maxWidth: 169, marginTop: 32 }}
				text={t("shareYourRights:tabBar.myEditor.addEditor")}
			/>
		</Column>
	)
}

export default SummaryProtectionWorkPage

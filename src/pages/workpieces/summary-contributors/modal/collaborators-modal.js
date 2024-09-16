import React from "react"
import { Flex, Group, Row } from "../../../../layout"
import { useTranslation } from "react-i18next"
import { DialogModal } from "../../../../widgets/modal"
import Button from "../../../../widgets/button"
import { Text } from "../../../../text"
import { StyleSheet } from "react-native"
import moment from "moment"
import SectionCollaborator from "./section-collaborators"
import Confidentiality from "./confidentiality"
import { useRightSplits } from "../../../../mobX/hooks"
import { useCurrentWorkpiece, useCurrentWorkpieceId } from "../../context"
import { observer } from "mobx-react"
import SplitChart, {
	DualSplitChart,
} from "../../../../smartsplit/components/split-chart"
import { useStores } from "../../../../mobX"
import { getArtistName } from "../../workpiece-summary/workpiece-sheet"

const Styles = StyleSheet.create({
	highlightWord: {
		color: "#2DA84F",
		fontWeight: "bold",
	},
	modifyBtn: { borderWidth: 1, borderColor: "#DCDFE1", borderStyle: "solid" },
	section: {
		paddingTop: 56,
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

const CollaboratorModal = observer((props) => {
	const { auth, collaborators } = useStores()
	const workpiece = useCurrentWorkpiece()
	const rightSplits = useRightSplits(workpiece.id)
	const { t } = useTranslation()
	const { visible, onRequestClose, data } = props
	const copyright = Array.from(data.copyright ? data.copyright : [])
	const interpretation = Array.from(
		data.interpretation ? data.interpretation : []
	)
	const soundRecording = Array.from(
		data.soundRecording ? data.soundRecording : []
	)
	if (workpiece.state === "loading") return
	return (
		<DialogModal
			key="collaborator-modal"
			size="large"
			visible={visible}
			onRequestClose={onRequestClose}
			title={t("shareYourRights:tabBar.version", { num: data.version || "" })}
			titleLevel={3}
			underTitle={
				<Text
					secondary
					small
					dangerouslySetInnerHTML={{
						__html: t("shareYourRights:collaboratorModal.underTitle", {
							name:
								workpiece.data.owner === auth.user_id
									? getArtistName(auth.user.data)
									: getArtistName(collaborators.map[workpiece.owner]),
							time: moment(data.lastUpdate).startOf("minute").fromNow(),
						}),
					}}
				></Text>
			}
			buttons={
				<>
					<Button
						secondary
						text={t("shareYourRights:tabBar.dragDrop.createNewversion")}
						onClick={() => onRequestClose(false)}
						disabled
					/>
					<Button
						text={t(
							"shareYourRights:tabBar.myCollaborators.sendToCollaborators"
						)}
						onClick={() => onRequestClose(true)}
					/>
				</>
			}
		>
			<Group>
				<Row>
					<Flex>
						{data && data.copyright && (
							<SectionCollaborator
								title={t("shareYourRights:collaboratorModal.copyright")}
								splitState={rightSplits.copyright}
								chart={
									rightSplits.copyright.domainState.mode === "roles" ? (
										<DualSplitChart
											{...rightSplits.copyright.genChartProps(
												rightSplits.copyright.domainState.mode
											)}
											size={300}
										/>
									) : (
										<SplitChart
											{...rightSplits.copyright.genChartProps(
												rightSplits.copyright.domainState.mode
											)}
											size={300}
										/>
									)
								}
								canModify
								isModal
							/>
						)}
						{data && data.interpretation && (
							<SectionCollaborator
								title={t("shareYourRights:collaboratorModal.interpretation")}
								splitState={rightSplits.performance}
								chart={
									<SplitChart
										{...rightSplits.performance.genChartProps()}
										startAngle={rightSplits.performance.startAngle}
										size={300}
									/>
								}
								style={Styles.section}
								canModify
								isModal
							/>
						)}
						{data && data.soundRecording && (
							<SectionCollaborator
								title={t("shareYourRights:collaboratorModal.soundRecording")}
								splitState={rightSplits.recording}
								style={Styles.section}
								chart={
									<SplitChart
										{...rightSplits.recording.genChartProps()}
										size={300}
									/>
								}
								canModify
								isModal
							/>
						)}
						{data && data.confidentiality && (
							<Confidentiality
								isModal
								data={data.confidentiality}
								canModify
								style={Styles.section}
							/>
						)}
					</Flex>
				</Row>
			</Group>
		</DialogModal>
	)
})
export default CollaboratorModal

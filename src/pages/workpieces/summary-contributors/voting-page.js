import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"
import { StyleSheet, View } from "react-native"
import Scrollable from "../../../widgets/scrollable"
import { Column, Flex, Hairline, Row } from "../../../layout"
import Button from "../../../widgets/button"
import { Heading, Text } from "../../../text"
import SectionCollaborator from "./modal/section-collaborators"
import { shareInfo } from "."
import Confidentiality from "./modal/confidentiality"
import SplitChart, {
	DualSplitChart,
} from "../../../smartsplit/components/split-chart"
import { useRightSplits } from "../../../mobX/hooks"
import { useCurrentWorkpieceId } from "../context"
import moment from "moment"

const Styles = StyleSheet.create({
	layout: { paddingHorizontal: "17%" },
	bodyLayout: { paddingVertical: 56 },
	bottomLayout: {
		justifyContent: "flex-end",
		paddingVertical: 16,
	},
	voteView: {
		marginTop: 32,
		padding: 32,
		borderWidth: 1,
		borderColor: "#DCDFE1",
		borderStyle: "solid",
		borderRadius: 4,
	},
	section: {
		paddingTop: 56,
	},
})

const VotingPage = observer((props) => {
	const { t } = useTranslation()
	const data = shareInfo
	const rightSplits = useRightSplits(useCurrentWorkpieceId())
	const num = 3
	const total = 3

	return (
		<Column flex={1}>
			<Scrollable>
				<Column style={[Styles.layout, Styles.bodyLayout]} flex={1}>
					<Row>
						<Column>
							<Heading level={2}>
								{t("shareYourRights:votingPage.validateSplit", {
									name: "Love You Baby",
								})}
							</Heading>
							<Text
								secondary
								style={{ paddingTop: 8 }}
								small
								dangerouslySetInnerHTML={{
									__html: t("shareYourRights:updateBy", {
										name: "Inscience ",
										hour: moment("02/02/2021 11:02")
											.startOf("second")
											.fromNow(),
									}),
								}}
							/>
						</Column>
					</Row>
					<Row style={{ paddingTop: 64 }}>
						<Column>
							<Heading level={3}>
								Version {data.columns.waitingToSend[0].version}
							</Heading>
							<Text
								secondary
								small
								dangerouslySetInnerHTML={{
									__html: t("shareYourRights:collaboratorModal.underTitle", {
										name: "ArtistName",
										time: moment("02/02/2021 11:06")
											.startOf("second")
											.fromNow(),
									}),
								}}
							/>
						</Column>
					</Row>
					<Row style={Styles.voteView}>
						<Flex>
							<SectionCollaborator
								title={t("shareYourRights:collaboratorModal.copyright")}
								data={data.columns.waitingToSend[0].copyright}
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
							/>
							<SectionCollaborator
								title={t("shareYourRights:collaboratorModal.interpretation")}
								data={data.columns.waitingToSend[0].interpretation}
								splitState={rightSplits.performance}
								chart={
									<SplitChart
										{...rightSplits.performance.genChartProps()}
										startAngle={rightSplits.performance.startAngle}
										size={300}
									/>
								}
							/>
							<SectionCollaborator
								title={t("shareYourRights:collaboratorModal.soundRecording")}
								data={data.columns.waitingToSend[0].soundRecording}
								chart={
									<SplitChart
										{...rightSplits.recording.genChartProps()}
										size={300}
									/>
								}
								splitState={rightSplits.performance}
							/>
							<Confidentiality
								data={data.columns.waitingToSend[0].confidentiality}
								style={Styles.section}
							/>
						</Flex>
					</Row>
				</Column>
			</Scrollable>
			<Hairline />
			<Row style={[Styles.bottomLayout, Styles.layout]}>
				<Column style={{ justifyContent: "center", paddingRight: 32 }}>
					<Text secondary align="center">
						{t("shareYourRights:votingPage.selectionsMade", {
							num: num,
							total: total,
						})}
					</Text>
				</Column>
				<Column>
					<Button
						bold
						disabled
						text={t("shareYourRights:votingPage.submitVote")}
					/>
				</Column>
			</Row>
		</Column>
	)
})
export default VotingPage

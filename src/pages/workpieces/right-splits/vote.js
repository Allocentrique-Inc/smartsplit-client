import Button from "../../../widgets/button"
import { Flex, Group, Row } from "../../../layout"
import { Text } from "../../../text"
import React from "react"
import Layout from "../layout"
import { observer } from "mobx-react"
import { useStores } from "../../../mobX"
import { useCurrentWorkpiece } from "../context"
import { useRightSplits } from "../../../mobX/hooks"
import { useTranslation } from "react-i18next"
import { DialogModal } from "../../../widgets/modal"
import { getArtistName } from "../workpiece-summary/workpiece-sheet"
import moment from "moment"
import SectionCollaborator from "../summary-protection-work/modal/section-collaborators"
import SplitChart, {
	DualSplitChart,
} from "../../../smartsplit/components/split-chart"
import Confidentiality from "../summary-protection-work/modal/confidentiality"

const VotingForm = observer((props) => {
	const { auth, collaborators } = useStores()
	const workpiece = useCurrentWorkpiece()
	const rightSplits = useRightSplits(workpiece.id)
	const { t } = useTranslation()
	const { visible, onRequestClose, data, version } = props
	console.log("data", data)
	if (workpiece.state === "loading") return
	console.log(toJS(workpiece))
	return (
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
	)
})
const VotingPage = observer((props) => {
	return (
		<Layout
			workpiece={workpiece}
			progress={0}
			path={[t("navbar.rightSplits"), rightSplits[currentSplit].pageTitle]}
			actions={
				<Button
					tertiary
					text={t("general:buttons.saveClose")}
					onClick={saveAndQuit}
					disabled={rightSplits.isPristine}
				/>
			}
			formNav={
				<>
					<Row flex={1}>
						<Button
							secondary
							text={t("general:buttons.back")}
							onClick={toPreviousPage}
						/>

						<Button
							primary
							text={t("general:buttons.continue")}
							onClick={toNextPage}
						/>
					</Row>
					<Row flex={1}>
						{rightSplits.$error && (
							<Text error>{rightSplits.$error.message}</Text>
						)}
					</Row>
				</>
			}
		>
			{!workpieces.isLoading &&
				React.createElement(rightSplits[currentSplit].form, {
					back: navigateToSummary,
				})}
		</Layout>
	)
})
export default VotingPage

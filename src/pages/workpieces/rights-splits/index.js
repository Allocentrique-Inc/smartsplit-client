import React from "react"
import { Redirect, useParams, useHistory } from "react-router"
import { useStores } from "../../../mobX"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Flex, Row } from "../../../layout"
import { Text } from "../../../text"
import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"
import { useCurrentWorkpiece, useRightsSplits } from "../context"

/**
 *	Split forms wrapper
 *	- Manages navigation between the forms pages
 *	- Shows global information like the progress bar or the page title
 *	- Initializes the split UI states with the splits of the current workpiece
 **/
const RightsSplitsPage = observer(() => {
	const { t } = useTranslation("rightsSplits")
	const history = useHistory()
	const { workpiece_id, split_type } = useParams()

	if (!workpiece_id) navigateToSummary()
	else if (!split_type)
		return (
			<Redirect to={`/workpieces/${workpiece_id}/rights-splits/copyright`} />
		)
	const workpiece = useCurrentWorkpiece()
	const rightsSplits = useRightsSplits()
	//FOR TESTING PURPOSE
	rightsSplits.copyright.domainState.addShareholder(
		"235556b5-3bbb-4c90-9411-4468d873969b"
	)
	rightsSplits.copyright.domainState.addShareholder(
		"c84d5b32-25ee-48df-9651-4584b4b78f28"
	)
	rightsSplits.copyright.domainState.addShareholder(
		"4f4950de-e5cd-41ea-84cb-997fc8f9183f"
	)
	rightsSplits.performance.domainState.addShareholder(
		"4f4950de-e5cd-41ea-84cb-997fc8f9183f"
	)
	rightsSplits.performance.domainState.addShareholder(
		"4154a7d5-578a-4fd9-b43b-98b1330c0fd1"
	)
	rightsSplits.performance.domainState.addShareholder(
		"b549ebd3-5c3b-4184-a3dd-bc5b8895073a"
	)
	rightsSplits.recording.domainState.addShareholder(
		"4154a7d5-578a-4fd9-b43b-98b1330c0fd1"
	)
	rightsSplits.recording.domainState.addShareholder(
		"b549ebd3-5c3b-4184-a3dd-bc5b8895073a"
	)
	rightsSplits.recording.domainState.addShareholder(
		"7e7984ac-1d9e-4ed3-b150-0560062caee0"
	)
	// Loading translation to UIStates. Surely there is
	// a better way to do that :-)
	rightsSplits.copyright.UIState.init(
		t("copyright.title"),
		t("lyrics"),
		t("music")
	)
	rightsSplits.performance.UIState.init(t("performance.title"))

	rightsSplits.recording.UIState.init(t("recording.title"))
	const { workpieces } = useStores()
	const currentSplit = split_type

	//TODO: refactor rights splits saving
	async function saveAndQuit() {
		try {
			await rightsSplits.save()
			history.push(`/workpieces/${workpiece.id}`)
		} catch (error) {
			console.error("Error saving rights splits", error)
		}
	}

	function navigateToSummary() {
		history.push(`/workpieces/${workpiece.id}`)
	}
	function toPreviousPage() {
		currentSplit === "copyright" && navigateToSummary()
		currentSplit === "performance" &&
			history.push(`/workpieces/${workpiece.id}/rights-splits/copyright`)
		currentSplit === "recording" &&
			history.push(`/workpieces/${workpiece.id}/rights-splits/performance`)
	}

	function toNextPage() {
		currentSplit === "copyright" &&
			history.push(`/workpieces/${workpiece.id}/rights-splits/performance`)
		currentSplit === "performance" &&
			history.push(`/workpieces/${workpiece.id}/rights-splits/recording`)
		currentSplit === "recording" && navigateToSummary()
	}

	return (
		<Layout
			workpiece={workpiece}
			progress={rightsSplits[currentSplit].UIState.progress}
			path={[
				t("navbar.rightSplits"),
				rightsSplits[currentSplit].UIState.pageTitle,
			]}
			actions={
				<Button
					tertiary
					text={t("general:buttons.saveClose")}
					onClick={saveAndQuit}
					disabled={!rightsSplits.$hasChanged}
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
						<Flex />
						<Button
							primary
							text={t("general:buttons.continue")}
							onClick={currentSplit === "recording" ? saveAndQuit : toNextPage}
						/>
					</Row>
					<Row flex={1}>
						{rightsSplits.$error && (
							<Text error>{rightsSplits.$error.message}</Text>
						)}
					</Row>
				</>
			}
		>
			{!workpieces.isLoading &&
				React.createElement(rightsSplits[currentSplit].UIState.form)}
		</Layout>
	)
})

export default RightsSplitsPage

import React from "react"
import { Redirect, useParams, useHistory } from "react-router"

import { useStores } from "../../../mobX"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Flex, Row } from "../../../layout"
import { Text } from "../../../text"
import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"
import { useCurrentWorkpiece } from "../context"
import { useSplitsPagesState } from "../../../mobX/hooks"
import { useRightsSplits } from "../context"

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

	// Initialization of split UI States with current workpiece splits
	const splits = useRightsSplits()
	const splitUIStates = useSplitsPagesState()
	splitUIStates.copyright.init(
		t("copyright.title"),
		t("lyrics"),
		t("music"),
		splits.copyright.sharesValues
	)
	splitUIStates.performance.init(
		t("performance.title"),
		splits.performance.sharesValues
	)

	const { workpieces } = useStores()
	const currentSplit = split_type

	//TODO: refactor rights splits saving
	const rightsSplits = workpiece.rightsSplits
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
			progress={splitUIStates[currentSplit].progress}
			path={[t("navbar.rightSplits"), splitUIStates[currentSplit].pageTitle]}
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
				React.createElement(splitUIStates[currentSplit].form)}
		</Layout>
	)
})

export default RightsSplitsPage

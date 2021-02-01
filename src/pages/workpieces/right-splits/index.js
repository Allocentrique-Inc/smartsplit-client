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
import { useRightSplits } from "../../../mobX/hooks"

/**
 *	Split forms wrapper
 *	- Manages navigation between the forms pages
 *	- Shows global information like the progress bar or the page title
 *	- Initializes the split UI states with data of the current workpiece
 **/
const RightSplitsPage = observer(() => {
	const { t } = useTranslation("rightSplits")
	const history = useHistory()
	const { workpiece_id, split_type } = useParams()

	if (!workpiece_id) navigateToSummary()
	else if (!split_type)
		return (
			<Redirect to={`/workpieces/${workpiece_id}/right-splits/copyright`} />
		)
	const workpiece = useCurrentWorkpiece()
	const rightSplits = useRightSplits(workpiece.id)
	const { workpieces } = useStores()
	const currentSplit = split_type
	async function saveAndQuit() {
		await rightSplits.save()
		navigateToSummary()
	}

	function navigateToSummary() {
		history.push(`/workpieces/${workpiece.id}`)
	}
	function toPreviousPage() {
		currentSplit === "copyright" && navigateToSummary()
		currentSplit === "performance" &&
			history.push(`/workpieces/${workpiece.id}/right-splits/copyright`)
		currentSplit === "recording" &&
			history.push(`/workpieces/${workpiece.id}/right-splits/performance`)
		currentSplit === "privacy" &&
			history.push(`/workpieces/${workpiece.id}/right-splits/recording`)
		currentSplit === "summary" &&
			history.push(`/workpieces/${workpiece.id}/right-splits/privacy`)
	}

	function toNextPage() {
		currentSplit === "copyright" &&
			history.push(`/workpieces/${workpiece.id}/right-splits/performance`)
		currentSplit === "performance" &&
			history.push(`/workpieces/${workpiece.id}/right-splits/recording`)
		currentSplit === "recording" &&
			history.push(`/workpieces/${workpiece.id}/right-splits/privacy`)
		currentSplit === "privacy" &&
			history.push(`/workpieces/${workpiece.id}/right-splits/summary`)
	}

	return (
		<Layout
			workpiece={workpiece}
			progress={rightSplits[currentSplit].progress}
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
						<Flex />
						<Button
							primary
							text={t("general:buttons.continue")}
							onClick={currentSplit === "recording" ? saveAndQuit : toNextPage}
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
				React.createElement(rightSplits[currentSplit].form)}
		</Layout>
	)
})

export default RightSplitsPage

/* import React from "react"
import { Redirect, useParams, useHistory } from "react-router"

<<<<<<< HEAD
import { useStores } from "../../../mobX"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Flex, Row } from "../../../layout"
import { Text } from "../../../text"
import CopyrightForm from "./copyright"
import PerformanceForm from "./performance"
import RecordingForm from "./recording"
import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"
import { useCurrentWorkpiece } from "../context"
import { useSplitsPagesState } from "../../../mobX/hooks"
import { useRightSplit } from "../context"

const RightsSplitsPage = observer(() => {
	const { t } = useTranslation()
	const history = useHistory()
	const { workpiece_id, split_type } = useParams()
	const splits = {
		copyright: {
			form: CopyrightForm,
			progress: (1 / 3) * 100,
			title: t("rightSplits:titles.copyright"),
		},
		performance: {
			form: PerformanceForm,
			progress: (2 / 3) * 100,
			title: t("rightSplits:titles.performance"),
		},
		recording: {
			form: RecordingForm,
			progress: (10 / 11) * 100,
			title: t("rightSplits:titles.recording"),
		},
	}
	if (!workpiece_id) navigateToSummary()
	else if (!split_type)
		return (
			<Redirect to={`/workpieces/${workpiece_id}/rights-splits/copyright`} />
		)
	const workpiece = useCurrentWorkpiece()

	// TEMPORARY. Initialization of splitsPagesState shares (only copyright at the moment) with current workpiece splits
	const split = useRightSplit("copyright")
	const { copyright } = useSplitsPagesState()
	copyright.init(
		t("rightSplits:lyrics"),
		t("rightSplits:music"),
		split.sharesValues
=======
import CopyrightPage from "./copyright"
import InterpretationPage from "./interpretation"
import RecordingPage from "./recording"
import GeneralInfos from "../documentation/general-infos"

export default function (props) {
	return (
		<Switch>
			<Route
				path="/workpieces/:workpiece_id/rights-splits"
				exact
				component={RedirectToCopyright}
			/>
			<Route
				path="/workpieces/:workpiece_id/rights-splits/copyright"
				component={CopyrightPage}
			/>
			<Route
				path="/workpieces/:workpiece_id/rights-splits/interpretation"
				component={InterpretationPage}
			/>
			<Route
				path="/workpieces/:workpiece_id/rights-splits/recording"
				component={RecordingPage}
			/>
			<Route
				path="/workpieces/:workpiece_id/documentation/general-infos"
				component={GeneralInfos}
			/>
		</Switch>
>>>>>>> feature/844-documente-ton-oeuvre-/infos-generales
	)

	const { workpieces } = useStores()
	const currentSplit = split_type

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
			progress={splits[currentSplit].progress}
			path={[t("rightSplits:navbar.rightSplits"), splits[currentSplit].title]}
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
			{!workpieces.isLoading && React.createElement(splits[currentSplit].form)}
		</Layout>
	)
})

export default RightsSplitsPage */

import React from "react"
import { Redirect, useParams, useHistory } from "react-router"

import { useStorePath, useStores } from "../../../mobX"
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

export default RightsSplitsPage
/**
 * FX regarde le code de Lila, ce sont des routes pour la doc
 * est-ce-que tu peux les combiner pour que les deux marchent
 */

/*
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
				path="/workpieces/:workpiece_id/documentation/release"
				component={Release}
			/>
			<Route
				path="/workpieces/:workpiece_id/documentation/creation"
				component={Creation}
			/>
			<Route
				path="/workpieces/:workpiece_id/documentation/performance"
				component={Performance}
			/>
			<Route
				path="/workpieces/:workpiece_id/documentation/recording"
				component={Recording}
			/>
			<Route
				path="/workpieces/:workpiece_id/documentation/files"
				component={Files}
			/>
			<Route
				path="/workpieces/:workpiece_id/documentation/lyrics"
				component={Lyrics}
			/>
		</Switch>
	)
}

export function RedirectToCopyright({ match }) {
	return (
		<Redirect
			to={`/workpieces/${match.params.workpiece_id}/rights-splits/copyright`}
		/>
	)
}
 */

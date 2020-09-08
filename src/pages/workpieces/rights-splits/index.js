import React from "react"
import { Redirect, useRouteMatch, useParams, useHistory } from "react-router"

import { useStorePath, useStores } from "../../../mobX"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Flex, Row } from "../../../layout"
import { Text } from "../../../text"
import CopyrightForm from "./copyright"
import InterpretationForm from "./interpretation"
import RecordingForm from "./recording"
import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"

const splits = {
	copyright: {
		form: CopyrightForm,
		progress: 1 / 3 * 100,
	},
	interpretation: {
		form: InterpretationForm,
		progress: 2 / 3 * 100,
	},
	recording: {
		form: RecordingForm,
		progress: (10 / 11) * 100,
	},
}
export default observer(() => {
	const {t} = useTranslation()
	const history = useHistory()
	const { workpiece_id, split_type } = useParams()
	if (!workpiece_id) return (
		<Redirect
			to={`/workpieces/${workpiece_id}/rights-splits/copyright`}
		/>)
	else if (!split_type) return (
		<Redirect
			to={`/workpieces/${workpiece_id}/rights-splits/copyright`}
		/>)
	const workpiece = useStorePath("workpieces").fetch(workpiece_id)



	const {workpieces} = useStores()
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
		currentSplit === "copyright" &&  navigateToSummary()
		currentSplit === "interpretation" && history.push(`/workpieces/${workpiece.id}/rights-splits/copyright`)
		currentSplit === "recording" && history.push(`/workpieces/${workpiece.id}/rights-splits/interpretation`)
	}



	function toNextPage() {
		currentSplit === "copyright" &&  history.push(`/workpieces/${workpiece.id}/rights-splits/interpretation`)
		currentSplit === "interpretation" && history.push(`/workpieces/${workpiece.id}/rights-splits/recording`)
		currentSplit === "recording" && navigateToSummary()
	}

	return (
		<Layout
			workpiece={workpiece}
			progress={splits[currentSplit].progress}
			path={[
				t("rightSplits:navbar.rightSplits"),
				t("rightSplits:titles.copyright"),
			]}
			actions={
				<Button
					tertiary
					text={t("general:buttons.saveAndClose")}
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
						<Flex/>
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
			{!workpieces.isLoading && React.createElement(splits[currentSplit].form, {split: workpiece.rightsSplits[currentSplit]}) }
		</Layout>
	)
})


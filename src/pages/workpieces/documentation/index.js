import React from "react"
import { useTranslation } from "react-i18next"
import { Redirect, useHistory, useParams } from "react-router"
import { observer } from "mobx-react"
import { useStorePath, useStores } from "../../../mobX"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Flex, Row } from "../../../layout"
import { Text } from "../../../text"
import CreationForm from "./creation"
import { PerformanceForm } from "./performance"
import { RecordingForm } from "./recording"
import { LyricsForm } from "./lyrics"
import { FilesForm } from "./files"

const DocumentationPage = observer(() => {
	const { t } = useTranslation()
	const history = useHistory()
	const { workpieces } = useStores()
	// Type représente le type de documentation à compléter : Création, Paroles etc...
	const { workpiece_id, type } = useParams()
	if (!workpiece_id) navigateToSummary()
	else if (!type)
		return (
			<Redirect to={`/workpieces/${workpiece_id}/documentation/creation`} />
		)
	const workpiece = useStorePath("workpieces").fetch(workpiece_id)

	const documentations = {
		creation: {
			form: CreationForm,
			progress: 12.5,
			title: t("document:navbar.pages.creation"),
		},
		performance: {
			form: PerformanceForm,
			progress: 25,
			title: t("document:navbar.pages.performance"),
		},
		files: {
			form: FilesForm,
			progress: 24,
			title: t("document:navbar.pages.files"),
		},
		recording: {
			form: RecordingForm,
			progress: 36.5,
			title: t("document:navbar.pages.recording"),
		},
		lyrics: {
			form: LyricsForm,
			progress: 62.5,
			title: t("document:navbar.pages.lyrics"),
		},
	}

	function navigateToSummary() {
		history.push(`/workpieces/${workpiece.id}`)
	}

	function toPreviousPage() {
		type === "creation" && navigateToSummary()
		type === "performance" &&
			history.push(`/workpieces/${workpiece.id}/documentation/creation`)
		type === "recording" &&
			history.push(`/workpieces/${workpiece.id}/documentation/performance`)
		type === "files" &&
			history.push(`/workpieces/${workpiece.id}/documentation/recording`)
		type === "lyrics" &&
			history.push(`/workpieces/${workpiece.id}/documentation/files`)
	}

	function toNextPage() {
		type === "creation" &&
			history.push(`/workpieces/${workpiece.id}/documentation/performance`)
		type === "performance" &&
			history.push(`/workpieces/${workpiece.id}/documentation/recording`)
		type === "recording" &&
			history.push(`/workpieces/${workpiece.id}/documentation/files`)
		type === "files" &&
			history.push(`/workpieces/${workpiece.id}/documentation/lyrics`)
		type === "lyrics" && navigateToSummary()
	}

	return (
		<Layout
			workpiece={workpiece}
			progress={documentations[type].progress}
			path={[t("rightSplits:navbar.rightSplits"), documentations[type].title]}
			actions={
				<Button
					tertiary
					text={t("general:buttons.saveClose")}
					onClick={() => {}}
					// disabled={!rightsSplits.$hasChanged}
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
							onClick={toNextPage}
						/>
					</Row>
				</>
			}
		>
			{!workpieces.isLoading && React.createElement(documentations[type].form)}
		</Layout>
	)
})

export default DocumentationPage

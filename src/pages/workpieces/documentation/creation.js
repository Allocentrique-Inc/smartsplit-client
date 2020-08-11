import React from "react"
import { useHistory } from "react-router"
import { useStorePath } from "../../../appstate/react"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline } from "../../../layout"

export default function Creation() {
	const history = useHistory()
	const workpiece = useCurrentWorkpiece()

	function saveAndQuit() {
		history.push("/dashboard/")
	}

	function navigateToSummary() {
		history.push(`/workpieces/${workpiece.id}`)
	}

	function navigateToInterpretation() {
		history.push(`/workpieces/${workpiece.id}/rights-splits/interpretation`)
	}
	return (
		<Layout
			workpiece={workpiece}
			path={["Documenter mon œuvre", "Création"]}
			actions={
				<Button tertiary text="Sauvegarder et fermer" onClick={saveAndQuit} />
			}
			formNav={
				<>
					<Row flex={1}>
						<Button secondary text="Retour" onClick={navigateToSummary} />
						<Flex />
						<Button
							primary
							text="Continuer"
							onClick={navigateToInterpretation}
						/>
					</Row>
					<Row flex={1} />
				</>
			}
		></Layout>
	)
}

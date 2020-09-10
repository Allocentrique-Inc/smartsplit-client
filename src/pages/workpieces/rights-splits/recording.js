import React from "react"
import { useHistory } from "react-router"
import { useCurrentWorkpiece } from "../context"
import { Column, Row, Flex, Hairline } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import Layout from "../layout"
import Button from "../../../widgets/button"

export default function InterpretationPage() {
	const history = useHistory()
	const workpiece = useCurrentWorkpiece()

	function saveAndQuit() {
		history.push(`/workpieces/${workpiece.id}`)
	}

	function navigateToInterpretation() {
		history.push(`/workpieces/${workpiece.id}/rights-splits/interpretation`)
	}

	return (
		<Layout
			workpiece={workpiece}
			path={["Partage de droits", "Droits de l'enregistrement"]}
			actions={
				<Button tertiary text="Sauvegarder et fermer" onClick={saveAndQuit} />
			}
			formNav={
				<>
					<Row flex={1}>
						<Button
							secondary
							text="Retour"
							onClick={navigateToInterpretation}
						/>
						<Flex />
						<Button primary text="Continuer" />
					</Row>
					<Row flex={1} />
				</>
			}
		></Layout>
	)
}

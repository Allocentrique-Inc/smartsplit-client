import React from "react"
import { useHistory } from "react-router"
import { useStorePath } from "../../../appstate/react"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import Copyright from "../../../../svg/copyright"

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
			progress={12.5}
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
		>
			<CreationForm />
		</Layout>
	)
}

export function CreationForm() {
	return (
		<Row>
			<Column of="group" flex={1}>
				<Column of="component">
					<Copyright />
					<Heading level={1}>Qui a inventé cette pièce musicale</Heading>
					<Paragraph>
						Sépare ici le droit d’auteur entre les créateurs, c’est à dire les
						auteurs des <b>paroles</b>, les compositeurs et les arrangeurs de la{" "}
						<b>musique</b>. Il est d’usage de partager le droit d’auteur
						équitablement. Mais tu peux faire autrement.
					</Paragraph>
				</Column>
			</Column>
			<Column flex={1} align="center"></Column>
		</Row>
	)
}

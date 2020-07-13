import React, { useRef } from "react"
import { useHistory } from "react-router"
import Layout from "../layout"

import { Row, Column, Flex, Hairline } from "../../../layout"
import { Form, RadioGroup, RadioGroupButton, FileField } from "../../../forms"
import { Heading, Paragraph, Text } from "../../../text"
import Button from "../../../widgets/button"

export default function ProtectWork({ workpiece }) {
	const history = useHistory()
	const form = useRef()

	function goToHome() {
		history.push("/workpieces/" + workpiece.id)
	}

	function onFormSubmit(values) {
		console.log("Submit", values)
	}

	function submitForm() {
		form.current.submit()
	}

	return (
		<Layout
			workpiece={workpiece}
			path={["Protège tes droits"]}
			progress={10}
			actions={<Button tertiary text="Abandonner" onClick={goToHome} />}
			formNav={
				<>
					<Row flex={1}>
						<Button secondary text="Retour" onClick={goToHome} />
						<Flex />
						<Button primary text="Continuer" onClick={submitForm} />
					</Row>
					<Row flex={1} />
				</>
			}
		>
			<Row of="group">
				<Form ref={form} onSubmit={onFormSubmit}>
					<ProtectWorkForm />
					<Flex />
					<ProtectWorkHelp />
				</Form>
			</Row>
		</Layout>
	)
}

export function ProtectWorkForm({ workpiece }) {
	return (
		<Column of="section" flex={6}>
			<Column of="component">
				<Heading level={1}>
					Quelle version de l'oeuvre aimerais-tu protéger?
				</Heading>
				<Paragraph>
					Ici, tu envoies ton oeuvre dans un encodeur informatique.
				</Paragraph>
				<Paragraph>
					L'algorithme derrière cette page prendra ton oeuvre et créera à partir
					d'elle une empreinte numérique unique que l'on nomme un <i>hash</i>.
				</Paragraph>
			</Column>

			<Column of="component">
				<Heading level={3}>Fichier à protéger</Heading>
				<FileField
					name="new-file"
					label="Ajouter un fichier"
					undertext="Tous formats acceptés. 250 Mo maximum."
				/>
			</Column>

			<Hairline />

			<Column of="component">
				<Heading level={3}>Version de travail</Heading>
				<RadioGroup>
					<Column of="inside">
						<RadioGroupButton value="idea" label="Idée" />
						<RadioGroupButton value="demo" label="Démo" />
						<RadioGroupButton value="rough-mix" label="Rough Mix" />
						<RadioGroupButton
							value="final-master"
							label="Version finale (masterisée)"
						/>
					</Column>
				</RadioGroup>
			</Column>
		</Column>
	)
}

export function ProtectWorkHelp() {
	return (
		<Column of="group" flex={5}>
			<Column of="component" padding="component" layer="underground">
				<Column of="inside">
					<Text small bold tertiary>
						AIDE
					</Text>
					<Hairline />
				</Column>

				<Heading level={4}>Pourquoi protéger mon oeuvre?</Heading>

				<Text secondary>
					Enregistrer son oeuvre sur la blockchain avec <i>Smartsplit</i> est
					équivalent à se l'envoyer par courrier recommandé à soi-même afin de
					pouvoir démontrer au besoin sa paternité
				</Text>
			</Column>
		</Column>
	)
}

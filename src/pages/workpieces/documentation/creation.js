import React, { useState } from "react"
import { useHistory } from "react-router"
import { useStorePath } from "../../../appstate/react"
import { useTranslation } from "react-i18next"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline, Spacer } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors } from "../../../theme"
import CopyrightIcon from "../../../svg/copyright"
import { DateField, TextField } from "../../../forms"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"

export default function Creation() {
	const { t } = useTranslation()
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

export function CreationForm(props) {
	const [date, setDate] = useState("")
	const searchResults = ["Aut", "Chose", "Comme", "Resultat"]
	const [search, setSearch] = useState("")
	const { t } = useTranslation()

	return (
		<Row>
			<Column of="group" flex={5}>
				<Column of="group">
					<Text action bold valign="center">
						<CopyrightIcon color={Colors.action} />
						{t("creation:category")}
						<Row padding="tiny" />
					</Text>
					<Heading level={1}>{t("creation:title")}</Heading>
					<Text secondary>{t("creation:paragraph")}</Text>
				</Column>
				<Spacer of="group" />
				<Column of="group">
					<DateField
						label={t("creation:date")}
						value={date}
						onChangeText={setDate}
						placeholder="DD-MM-YYYY"
					/>
					<AddCollaboratorDropdown
						label={t("creation:roles.authors")}
						subLabel={t("creation:roles.authorsWho")}
						searchResults={searchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("creation:roles.addAuthor")}
					/>
					<AddCollaboratorDropdown
						label={t("creation:roles.composers")}
						subLabel={t("creation:roles.composersWho")}
						searchResults={searchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("creation:roles.addComposer")}
					/>
					<AddCollaboratorDropdown
						label={t("creation:roles.editors")}
						subLabel={t("creation:roles.editorsWho")}
						searchResults={searchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("creation:roles.addEditor")}
					/>
					<TextField
						name="iswc"
						label={t("creation:iswc")}
						label_hint={t("forms:labels.optional")}
						tooltip=""
					/>
				</Column>
			</Column>
			<Flex />
			<Column of="group" flex={4}>
				<Column of="component" padding="component" layer="underground">
					<Column of="inside">
						<Text small bold tertiary>
							AIDE
						</Text>
						<Hairline />
					</Column>

					<Heading level={4}>C'est quoi un créateur ?</Heading>

					<Text secondary>
						Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
						dolor sit amet.
					</Text>
				</Column>
			</Column>
		</Row>
	)
}

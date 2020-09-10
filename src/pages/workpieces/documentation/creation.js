import React, { useState } from "react"
import { useHistory } from "react-router"
import { useTranslation } from "react-i18next"
import { StyleSheet } from "react-native"
import { useCurrentWorkpiece } from "../context"
import Layout from "../layout"
import Button from "../../../widgets/button"
import { Column, Row, Flex, Hairline, Spacer } from "../../../layout"
import { Text, Heading, Paragraph } from "../../../text"
import { Colors, Metrics } from "../../../theme"
import CopyrightIcon from "../../../svg/copyright"
import { DateField, TextField } from "../../../forms"
import AddCollaboratorDropdown from "../../../smartsplit/components/add-collaborator-dropdown"

const Styles = StyleSheet.create({
	category: {
		alignItems: "center",
		display: "flex",
	},
	logo: {
		marginRight: Metrics.spacing.component,
	},
})

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

	function navigateToCreation() {
		history.push(`/workpieces/${workpiece.id}/documentation/performance`)
	}
	return (
		<Layout
			workpiece={workpiece}
			path={[
				t("document:navbar.document"),
				t("document:navbar.pages.creation"),
			]}
			progress={12.5}
			actions={
				<Button
					tertiary
					text={t("general:buttons.saveClose")}
					onClick={saveAndQuit}
				/>
			}
			formNav={
				<>
					<Row flex={1}>
						<Button
							secondary
							text={t("general:buttons.back")}
							onClick={navigateToSummary}
						/>
						<Flex />
						<Button
							primary
							text={t("general:buttons.pass")}
							onClick={navigateToCreation}
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
	const searchResults = []
	const [search, setSearch] = useState("")
	const { t } = useTranslation()

	return (
		<Row>
			<Column of="group" flex={5}>
				<Column of="group">
					<Text action bold style={Styles.category}>
						<CopyrightIcon color={Colors.action} style={Styles.logo} />
						{t("document:creation.category")}
						<Row padding="tiny" />
					</Text>
					<Heading level={1}>{t("document:creation.title")}</Heading>
					<Paragraph>{t("document:creation.paragraph")}</Paragraph>
				</Column>
				<Spacer of="group" />
				<Column of="group">
					{/* To Do: À confirmer si plus court que les autres field */}
					<DateField
						label={t("document:creation.date")}
						value={date}
						onChangeText={setDate}
						placeholder={t("forms:placeholders.date")}
					/>

					<AddCollaboratorDropdown
						label={t("document:creation.roles.authors")}
						subLabel={t("document:creation.roles.authorsWho")}
						searchResults={searchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("document:creation.roles.addAuthor")}
					/>
					<AddCollaboratorDropdown
						label={t("document:creation.roles.composers")}
						subLabel={t("document:creation.roles.composersWho")}
						searchResults={searchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("document:creation.roles.addComposer")}
					/>
					<AddCollaboratorDropdown
						label={t("document:creation.roles.editors")}
						subLabel={t("document:creation.roles.editorsWho")}
						searchResults={searchResults}
						searchInput={search}
						onSearchChange={setSearch}
						onSelect={(selection) => console.log(selection)}
						placeholder={t("document:creation.roles.addEditor")}
					/>
					<TextField
						name="iswc"
						label={t("document:creation.iswc")}
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
							{t("document:help")}
						</Text>
						<Hairline />
					</Column>

					<Heading level={4}>{t("document:creation.what")}</Heading>

					<Text secondary>
						Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
						dolor sit amet.
					</Text>
				</Column>
			</Column>
		</Row>
	)
}
